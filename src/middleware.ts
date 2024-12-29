import { JWTExpired } from "jose/errors";
import { NextRequest, NextResponse } from "next/server";
import { PATH_PAGE_ACCOUNTS_LOGIN } from "./lib";
import { decrypt } from "./lib/JWT/verifyToken";
import { changeTokenId } from "./services";

export async function middleware(request: NextRequest) {
  const tokenId = request.cookies.get("tokenId")?.value;
  try {
    const user = tokenId ? await decrypt(tokenId) : null;
    // Se o usuário está autenticado, permite o acesso as rotas do config
    if (user) return NextResponse.next();
  } catch (error) {
    if (error instanceof JWTExpired && tokenId) {
      const tokenRefresh = request.cookies.get("token")?.value || "";
      const response = await changeTokenId(tokenRefresh, tokenId);
      if (response.status === 200) {
        // TODO: falta adicionar aos cookies novos tokens (criar a funcao para isso)
        console.log("Redefiniu Tokens");
        return NextResponse.next();
      }
    }
  }
  return NextResponse.redirect(new URL(PATH_PAGE_ACCOUNTS_LOGIN, request.url));
}

export const config = {
  matcher: [
    "/home/:path*",
    "/manage/:path*",
    "/perfils/:path*",
    "/permissoes/:path*",
  ],
};
