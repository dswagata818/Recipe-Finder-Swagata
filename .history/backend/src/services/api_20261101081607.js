import axios from "axios";

// Configure the backend API base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;