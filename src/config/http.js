import { create } from "axios";

const http = create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

/*http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error (e.g., redirect to login page)
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);*/

export default http;