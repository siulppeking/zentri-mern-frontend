import { create } from "axios";

const http = create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default http;