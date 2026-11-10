import axios from "axios";

const baseURL = process.env.API_BASE_URL?.trim();

if (!baseURL) {
  throw new Error("API_BASE_URL is required to configure the API client");
}

// Use the environment-specific API URL for development and production.
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;