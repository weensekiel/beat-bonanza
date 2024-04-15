import "./RegisterPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/register", {
                email,
                username,
                password
            });
            console.log(response.data)

            navigate("/login");
        } catch (error) {
            setError("An error occurred during registration. Please try again later.");
        }
    }

    return (
        <main className="register">
            <h1 className="register__title">Beat Bonanza</h1>
            <h2 className="register__title">Register</h2>
            <form className="register__form" onSubmit={handleRegister}>
                <label htmlFor="email">Email: </label>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="username">Username: </label>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p className="register__error">{error}</p>}

                <button type="submit" className="register__button">Register</button>
            </form>
            <Link to="/login">
                <p className="register__footer">Already have an account? Login here</p>
            </Link>
        </main>
    );
}
