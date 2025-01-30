"use client";
import {
  handleError,
  PATH_PAGE_ACCOUNTS_LOGIN,
  PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION,
  PATH_PAGE_HOME,
} from "@/lib";
import { createCookie, deleteCookie, getCookie } from "@/lib/actions/";
import { decrypt } from "@/lib/JWT/verifyToken";
import {
  loginRequest,
  LoginResponse,
  logoutRequest,
  otpValidation,
} from "@/services";
import { loginByQrCodeRequest } from "@/services/accounts/loginByQrCode";
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
    loginType: string,
    next?: string
  ) {
    const response = isOtpValidation
      ? await otpValidation(email, password, loginType)
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
      urlParams.set("login_type", "email");
      push(
        `${PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION}?${urlParams.toString()}`
      );
    } else {
      const error = response.data as ErrorResponse;
      toast.error(error.message);
    }
  }

  async function loginQrCode(token: string, next?: string) {
    const response = await loginByQrCodeRequest(token);
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
      const data = response.data as LoginResponse;
      const urlParams = new URLSearchParams(searchParams);
      urlParams.set("email", data.tokenId); //tokenId nesse caso é o email
      urlParams.set("login_type", "qrCode");
      push(
        `${PATH_PAGE_ACCOUNTS_LOGIN_2FA_VERIFICATION}?${urlParams.toString()}`
      );
    } else {
      const error = response.data as ErrorResponse;
      toast.error(error.message);
    }
  }

  async function logout() {
    try {
      logoutRequest(user?.id || "");
      await deleteCookie("tokenId");
      await deleteCookie("token");
      replace(PATH_PAGE_ACCOUNTS_LOGIN);
      setUser(undefined);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...user,
        isAuthenticated,
        token,
        loading,
        login,
        loginQrCode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
