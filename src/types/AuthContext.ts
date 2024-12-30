export interface UserInterface {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthContextInterface extends UserInterface {
  loading: boolean;
  isAuthenticated: boolean;
  token?: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderInterface {
  children: React.ReactNode;
}
