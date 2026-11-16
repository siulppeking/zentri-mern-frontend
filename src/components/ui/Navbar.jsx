import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = () => {

    const { user, logout } = useAuth();

    const handleLogout = () => {
        const confirmLogout = confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            logout();
        }
    }

    return (
        <nav className="navbar">
            <figure>
                <img className="navbar-logo" src="/react-logo.webp" alt="Logo"  width="35"/>
            </figure>
            
            <ul className="navbar-links">
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/task">Tasks</Link></li>
                <li><Link to="/task-new">New Task</Link></li>
            </ul>

            <div className="navbar-user">
                <p>Welcome, {user?.firstname} {user?.lastname}</p>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    )
}
