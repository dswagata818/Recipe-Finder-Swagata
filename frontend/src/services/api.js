import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:5000/api";

export const TOKEN_STORAGE_KEY = "swagata_recipe_token";
export const USER_STORAGE_KEY = "swagata_recipe_user";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const sentToken = Boolean(error.config?.headers?.Authorization);

    if (error.response?.status === 401 && sentToken) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      window.dispatchEvent(new Event("swagata:unauthorized"));
    }

    return Promise.reject(error);
  },
);

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  return error.response?.data?.message || error.message || fallback;
}

export default api;
