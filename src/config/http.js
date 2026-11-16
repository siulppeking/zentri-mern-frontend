import { create } from "axios";

const http = create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
