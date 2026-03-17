import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
})


let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;


api.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


let refreshHandler = null;

export const setRefreshHandler = (fn) => {
  refreshHandler = fn;
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !originalRequest._retry && refreshHandler) {

      originalRequest._retry = true;

      const newToken = await refreshHandler();

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(err);
  }
);

export default api