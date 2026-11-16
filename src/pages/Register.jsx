import { useForm } from "react-hook-form"
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {

    const navigate = useNavigate();

    const { register: registerUser, isAuthenticated, error } = useAuth();

    const { register, handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (userData) => {
        registerUser(userData);
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/task");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Register</h1>
            {error && <span style={{ color: "red" }}>{error}</span>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="firstname">First Name</label>
                <input type="text" id="firstname" {...register("firstname", { required: true, minLength: 2 })} />
                {
                    errors.firstname && <span style={{ color: "red" }}>First name is required and should be at least 2 characters long</span>
                }
                <br />

                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" {...register("lastname", { required: true, minLength: 2 })} />
                {
                    errors.lastname && <span style={{ color: "red" }}>Last name is required and should be at least 2 characters long</span>
                }
                <br />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                {
                    errors.email && <span style={{ color: "red" }}>Valid email is required</span>
                }
                <br />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", { required: true, minLength: 6 })} />
                {
                    errors.password && <span style={{ color: "red" }}>Password is required and should be at least 6 characters long</span>
                }
                <br />

                <button type="submit">Register</button>
            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}
