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
      const res = NextResponse.next();
      res.cookies.delete("tokenId");
      const tokenRefresh = request.cookies.get("token")?.value || "";
      const response = await changeTokenId(tokenRefresh, tokenId);
      if (response.status === 200) {
        const data = response.data;
        // Adiciona novos cookies
        res.cookies.set("tokenId", data.tokenId, { maxAge: 2 * 60 * 60 }); // 2 horas
        res.cookies.set("token", data.token, { maxAge: 30 * 24 * 60 * 60 }); // 30 dias
        console.log("Redefiniu Tokens");
        return res;
      }
    }
  }
  const redirectResponse = NextResponse.redirect(
    new URL(PATH_PAGE_ACCOUNTS_LOGIN, request.url)
  );
  redirectResponse.cookies.delete("tokenId");
  return redirectResponse;
}

export const config = {
  matcher: [
    "/home/:path*",
    "/manage/:path*",
    "/perfils/:path*",
    "/permissoes/:path*",
  ],
};
