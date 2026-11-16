import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import { Loading } from "../components/ui/Loading";

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

    if (loading) return <Loading />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};