import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { loginRequest, refreshRequest, logoutRequest } from "../features/auth/services/authApi";

import { setAccessToken as setAccessTokenAxios, setRefreshHandler } from "@/lib/axios"

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

      setAccessTokenAxios(data.token)

      return data.token;
    } catch (err) {
      console.log(err)
      setUser(null);
      setAccessToken(null);
      setAccessTokenAxios(null)
      return null;
    }
  };


  const login = async (email, password) => {
    const data = await loginRequest(email, password);

    if (data.token) {
      setAccessToken(data.token);
      setUser(jwtDecode(data.token).role);

      setAccessTokenAxios(data.token)
    }

    return data;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    setAccessToken(null);

    setAccessTokenAxios(null)
  };

  useEffect(() => {

    setRefreshHandler(refreshAccessToken)

    const init = async () => {
      await refreshAccessToken();
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);