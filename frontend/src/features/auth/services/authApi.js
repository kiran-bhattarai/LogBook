const API_URL = import.meta.env.VITE_API_URL;
import api from "@/lib/axios"

export const loginRequest = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password })
  return data
};

export const refreshRequest = async () => {
  const { data } = await api.post("/auth/refresh")
  return data
};

export const logoutRequest = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};

export const signupRequest = async ({ name, email, password, passwordRetype }) => {
  const { data } = await api.post("/auth/signup", { name, email, password, passwordRetype })
  return data
}

export const checkEmailRequest = async (email) => {
  const { data } = await api.post("/auth/check-email", { email })
  return data
}

export const checkResetCodeRequest = async ({ email, code }) => {
  const { data } = await api.post("/auth/check-email", { email, code })
  return data
}

export const changePasswordMainRequest = async ({ email, code, password }) => {
  const { data } = await api.post("/auth/change-password-main", { email, code, password })
  return data
}

export const getEmailRequest = async () => {
  const { data } = await api.get("/auth/get-email")
  return data
}

export const verifyEmailRequest = async (code) => {
  const { data } = await api.post("/auth/verify-email", { code })
  return data
}

export const sendCodeRequest = async (code) => {
  const { data } = await api.post("/auth/send-code", { code })
  return data
}
