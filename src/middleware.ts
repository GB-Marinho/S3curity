import { JWTExpired } from "jose/errors";
import { NextRequest, NextResponse } from "next/server";
import { PATH_PAGE_ACCOUNTS_LOGIN } from "./lib";
import { decrypt } from "./lib/JWT/verifyToken";
import { changeTokenId } from "./services";

export async function middleware(request: NextRequest) {
  // console.log(request.cookies.getAll());
  // const tokenId = request.cookies.get("tokenId")?.value;
  const tokenId = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxZTBkZWYxLWJhZDktNGVlZi05MDY1LWVkYjRlNWExYjAzYSIsIm5vbWUiOiJBbmEgTWFyaWEiLCJlbWFpbCI6ImFuYUB6bWFpbC5jb20iLCJpYXQiOjE3MzUyNDM0MTEsImV4cCI6MTczNTI0NDMxMX0.lXcvmqeHkRkyPEeeX2SxXLBSYBhYMCzoT7eedHLpW3iJnlK0J1lhUHRkrg_0wxvM4CN6Rn7vBzVBeHpm68yY33qfR3YFeZ7MSuGrIkFJE4x2GhpB4jvl0IlKBiWrHlDshdmm_-_EX9hQKGhfPad0dvTWABawAeaktopvoglau1k5PwcNZt2lQ6jx0bVmbGFEAVpl5DNqla8j73Jhhtv0WoPgk8281fhRto6zrg45pL4kIVCkPGwwFRC9IecYZqucVytJgk0BRl0Lyode6fH_-hseiN39Mcw-WVZ6XiAPgyaNfFLrvx6zJSKNwUUTRHx5ZZfqSDEeRZF1u7r4T3YeCw`;
  try {
    const user = await decrypt(tokenId);
    console.log("USER", user);
    if (user) return NextResponse.next();
  } catch (error) {
    if (error instanceof JWTExpired) {
      const tokenRefresh = request.cookies.get("token")?.value || "";
      const response = await changeTokenId(tokenRefresh, tokenId);
      if (response.status === 200) {
        // TODO: falta adicionar aos cookies novos tokens (criar a funcao para isso)
        console.log("Redefiniu Tokens");
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(
      new URL(PATH_PAGE_ACCOUNTS_LOGIN, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/home/:path*",
    "/manage/:path*",
    "/perfils/:path*",
    "/permissoes/:path*",
  ],
};
