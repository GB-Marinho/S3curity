// API - V1 -------------------------------------
export const API_BASE_URL_USE_SERVER =
  process.env.NEXT_PUBLIC_API_BASE_URL_USE_SERVER || "";
export const API_BASE_URL_USE_CLIENT =
  process.env.NEXT_PUBLIC_API_BASE_URL_USE_CLIENT || "";
// export const API_BASE_URL = "http://host.docker.internal:8000/v1";
export const API_AUTH = `/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_USER_REGISTER = `${API_AUTH}/registrar-usuario`;
export const API_AUTH_RECOVERY_BY_EMAIL = `${API_AUTH}/recuperar-por-email`;
export const API_AUTH_VERIFY_EMAIL_TOKEN = `${API_AUTH}/verificar-token`;
export const API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN = `${API_AUTH}/alterar-senha-email`;
// PAGES WEBAPP ---------------------------------
export const PATH_PAGE_HOME = "/";
// PAGES WEBAPP - ACCOUNTS ----------------------
export const PATH_PAGE_ACCOUNTS = "/accounts";
export const PATH_PAGE_ACCOUNTS_LOGIN = `${PATH_PAGE_ACCOUNTS}/login`;
export const PATH_PAGE_ACCOUNTS_REGISTER = `${PATH_PAGE_ACCOUNTS}/register`;
export const PATH_PAGE_ACCOUNTS_RECOVERY = `${PATH_PAGE_ACCOUNTS}/recovery`;
export const PATH_PAGE_ACCOUNTS_RECOVERY_SUCCESS = `${PATH_PAGE_ACCOUNTS_RECOVERY}/success`;
export const PATH_PAGE_ACCOUNTS_RECOVERY_EMAIL = `${PATH_PAGE_ACCOUNTS_RECOVERY}/email`;