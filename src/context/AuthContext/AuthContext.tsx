"use client";
import {
  PATH_PAGE_ACCOUNTS_LOGIN,
  PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION,
  PATH_PAGE_HOME,
} from "@/lib";
import { createCookie, deleteCookie, getCookie } from "@/lib/actions/";
import { decrypt } from "@/lib/JWT/verifyToken";
import { loginRequest, LoginResponse, otpValidation } from "@/services";
import {
  AuthContextInterface,
  AuthProviderInterface,
  ErrorResponse,
  UserInterface,
} from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
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
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | undefined>(undefined);

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
        setId(payload.id as string);
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

  async function login(
    email: string,
    password: string,
    isOtpValidation = false,
    next?: string
  ) {
    const response = isOtpValidation
      ? await otpValidation(email, password)
      : await loginRequest(email, password);
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
      window.location.replace(next || PATH_PAGE_HOME);
    } else if (response.status === 303) {
      const urlParams = new URLSearchParams(searchParams);
      urlParams.set("email", email);
      push(
        `${PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION}?${urlParams.toString()}`
      );
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
