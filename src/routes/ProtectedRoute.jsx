import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const ProtectedRoute = () => {
    const { isAuthenticated, loading, verifyAuth } = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                await verifyAuth();
            }
        };
        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};