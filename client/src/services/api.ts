import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// request
api.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("token");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        // corrupted value in storage, send the request without a token
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// response
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const url: string = err.config?.url ?? "";
    const isAuthCall = url.startsWith("/auth/");

    if (err.response?.status === 401 && !isAuthCall) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default api;
