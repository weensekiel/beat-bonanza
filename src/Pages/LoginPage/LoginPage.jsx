import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/user/login", {
                username,
                password
            });

            navigate(`/dashboard/user/${response.data.id}`);

        } catch (e) {
            setError("Invalid username/password");
        }
    }

    return (
        <main className="login">
            <h1 className="login__title">Beat Bonanza</h1>
            <h2 className="login__title">Login</h2>
            <form className="login__form" onSubmit={handleLogin}>
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

                {error && <p className="login__error">{error}</p>}


                <button type="submit" className="login__button">Login</button>
            </form>
            <Link to="/register">
                <p className="login__footer">Don't have an account? Register here</p>
            </Link>
        </main>
    );
}