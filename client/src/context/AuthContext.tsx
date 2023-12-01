import { createContext, useContext, useState, ReactNode } from "react";

import { getApiUrl } from "../utils/helpers/general";
import { User, UserType } from "../interfaces/user.interfaces";

interface AuthContextType {
  loadingAuth: boolean;
  isAuthenticated: boolean;
  isContractor: boolean;
  isClient: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  authCheck: () => void;
  updateUserBalance: (balance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({
  children,
  defaultState = {},
}: {
  children: ReactNode;
  defaultState?: Partial<AuthContextType>;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultState.isAuthenticated || false
  );
  const [loadingAuth, setLoadingAuth] = useState<boolean>(
    defaultState.loadingAuth || false
  );
  const [isContractor, setIsContractor] = useState<boolean>(
    defaultState.isContractor || false
  );
  const [isClient, setIsClient] = useState<boolean>(
    defaultState.isClient || false
  );
  const [user, setUser] = useState<User | null>(defaultState.user || null);

  const login = (user: User) => {
    localStorage.setItem("profile_id", String(user.id));
    setUser(user);
    setIsAuthenticated(true);
    setIsClient(user.type === UserType.CLIENT);
    setIsContractor(user.type === UserType.CONTRACTOR);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("profile_id");
    setUser(null);
    setIsClient(false);
    setIsContractor(false);
    window.location.href = "/";
  };

  const updateUserBalance = (balance: number) => {
    if (user) {
      setUser({ ...user, balance });
    }
  };

  const authCheck = () => {
    const profileId = localStorage.getItem("profile_id");
    if (profileId && !isAuthenticated && !loadingAuth) {
      setLoadingAuth(true);
      fetch(getApiUrl("user/me"), { headers: { profile_id: profileId } })
        .then((res) => res.json())
        .then((json: { data: User }) => {
          setUser(json.data);
          setLoadingAuth(false);
          setIsClient(json.data.type === UserType.CLIENT);
          setIsContractor(json.data.type === UserType.CONTRACTOR);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          setLoadingAuth(true);
          setIsClient(false);
          setIsContractor(false);
          window.location.href = "/";
        });
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    loadingAuth,
    user,
    isContractor,
    isClient,
    login,
    logout,
    authCheck,
    updateUserBalance,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
