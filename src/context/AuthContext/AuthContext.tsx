"use client";
import { PATH_PAGE_ACCOUNTS_LOGIN } from "@/lib";
import { createCookie, deleteCookie, getCookie } from "@/lib/actions/";
import { decrypt } from "@/lib/JWT/verifyToken";
import { loginRequest, LoginResponse } from "@/services";
import {
  AuthContextInterface,
  AuthProviderInterface,
  ErrorResponse,
  UserInterface,
} from "@/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface
);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderInterface) {
  const [userState, setUser] = useState<UserInterface>();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const { replace } = useRouter();

  const user = useMemo(() => userState, [userState]);

  const isAuthenticated = !!user;

  const initializeUser = useCallback(async () => {
    setLoading(true);
    try {
      const tokenId = await getCookie("tokenId");
      if (tokenId?.value) {
        const payload = await decrypt(tokenId.value);
        setToken(tokenId.value);
        setUser({
          id: payload.id as string,
          name: payload.nome as string,
          email: payload.email as string,
        });
      }
    } catch (error) {
      console.error(error);
      // toast.error("Falha ao autenticar. Faça login novamente.");
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  async function login(email: string, password: string) {
    const response = await loginRequest(email, password);
    if (response.status === 200) {
      const data = response.data as LoginResponse;
      await createCookie("tokenId", data.tokenId);
      await createCookie("token", data.token, 30 * 24 * 60 * 60); // 30 dias
      const payload = await decrypt(data.tokenId);
      setToken(data.tokenId);
      setUser({
        id: payload.id as string,
        name: payload.nome as string,
        email: payload.email as string,
      });
      // replace(PATH_PAGE_HOME);
    } else {
      const error = response.data as ErrorResponse;
      toast.error(error.message);
    }
  }

  async function logout() {
    await deleteCookie("tokenId");
    await deleteCookie("token");
    replace(PATH_PAGE_ACCOUNTS_LOGIN);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{ ...user, isAuthenticated, token, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
