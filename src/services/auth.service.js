import http from "../config/http";

export const registerService = async (userData) => {
    const response = await http.post("/auth/register", userData);
    return response.data;
};

export const loginService = async (credentials) => {
    const response = await http.post("/auth/login", credentials);
    return response.data;
};

export const logoutService = async () => {
    const response = await http.post("/auth/logout");
    return response.data;
};

export const verifyAuthService = async () => {
    const response = await http.get("/auth/verify");
    return response.data;
};