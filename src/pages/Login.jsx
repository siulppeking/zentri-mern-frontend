import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

export const Login = () => {

    const navigate = useNavigate();

    const { login, isAuthenticated, error: loginError } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleOnSubmit = (credentials) => {
        login(credentials);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/task");
        }
    }, [isAuthenticated, navigate])

    return (
        <div>
            <h1>Login</h1>
            {
                loginError && <span style={{ color: "red" }}>{loginError}</span>
            }
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                />
                {
                    errors.email && <span style={{ color: "red" }}>Valid email is required</span>
                }
                <br />

                <label htmlFor="password">Password</label>
                <input type="password" id="password"
                    {...register("password", { required: true, minLength: 6 })}
                />
                {
                    errors.password && <span style={{ color: "red" }}>Password is required and should be at least 6 characters long</span>
                }
                <br />

                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}
