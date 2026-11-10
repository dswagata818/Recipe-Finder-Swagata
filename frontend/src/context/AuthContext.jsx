import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { login as loginRequest, register as registerRequest } from "../services/authService.js";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../services/api.js";

const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [user, setUser] = useState(readStoredUser);

  const saveSession = useCallback((response) => {
    if (!response.token || !response.user) {
      throw new Error("The server returned an incomplete authentication response.");
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
    setToken(response.token);
    setUser(response.user);
    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await loginRequest(credentials);
    return saveSession(response);
  }, [saveSession]);

  const register = useCallback(async (details) => {
    const response = await registerRequest(details);
    return saveSession(response);
  }, [saveSession]);

  useEffect(() => {
    window.addEventListener("swagata:unauthorized", logout);
    return () => window.removeEventListener("swagata:unauthorized", logout);
  }, [logout]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, register, logout }),
    [token, user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
