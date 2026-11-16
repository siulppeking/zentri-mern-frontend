import { useAuth } from "../contexts/AuthContext"

export const Task = () => {

    const handleLogout = () => {
        const succes = confirm("Are you sure you want to logout?");
        if (succes) {
            logout();
        }
    }

    const { user, logout } = useAuth();
    return (
        <div>
            <h1>Task Page</h1>
            <p>Welcome, {user?.firstname} {user?.lastname}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
