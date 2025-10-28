"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name?: string;
  role?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = (username: string, password: string): boolean => {
    // Validate credentials
    if (username === "BlackVault_Entry" && password === "Badge-BV!") {
      setUser({
        id: "1",
        email: "blackvault@investigators.com",
        name: "Black Vault Investigator",
        role: "investigator"
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}