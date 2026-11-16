import { createContext, useContext, useEffect, useState } from "react";
import { loginService, logoutService, registerService, verifyAuthService } from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const register = async (userData) => {
        try {
            setError(null);
            const data = await registerService(userData);
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed");
            console.error("Registration failed:", error);
        } finally {
            setLoading(false);
        }
    }

    const login = async (credentials) => {
        try {
            setError(null);
            const data = await loginService(credentials);
            setUser(data.user);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.response?.data?.message || "Login failed");
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            setLoading(true);
            await logoutService();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    }


    const verifyAuth = async () => {
        try {
            const data = await verifyAuthService();
            setUser(data.user);
            setIsAuthenticated(true);
            return true;
        } catch {
            setUser(null);
            setIsAuthenticated(false);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loading,
            register,
            login,
            logout,
            verifyAuth,
            error
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};