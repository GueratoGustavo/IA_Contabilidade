import { useCallback } from "react";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isAuthenticated = Boolean(token);

  const login = useCallback((token: string, userData?: any) => {
    localStorage.setItem("token", token);
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/"; // Redireciona pro login
  }, []);

  return {
    isAuthenticated,
    token,
    user,
    login,
    logout,
  };
};
