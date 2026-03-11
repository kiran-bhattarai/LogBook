import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";

import { loginRequest, refreshRequest, logoutRequest } from "../features/auth/services/authApi";
import { createProtectedFetch } from "../utils/fetchClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const data = await refreshRequest();

      setAccessToken(data.token);
      setUser(jwtDecode(data.token).role);

      return data.token;
    } catch (err) {
      setUser(null);
      setAccessToken(null);
      return null;
    }
  };

const protectedFetch = useMemo(() => {
  return createProtectedFetch(
    () => accessToken,
    refreshAccessToken
  );
}, [accessToken]);

  const login = async (email, password) => {
    const data = await loginRequest(email, password);

    if (data.token) {
      setAccessToken(data.token);
      setUser(jwtDecode(data.token).role);
    }

    return data;
  };

  const logout = async () => {
    await logoutRequest(protectedFetch);
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const init = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout, protectedFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);