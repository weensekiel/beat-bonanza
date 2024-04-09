import "./LoginPage.scss";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
        <main className="login">
            <h1 className="login__title">Beat Bonanza</h1>
            <h2 className="login__title">Login</h2>
            <form className="login__form">
                <label htmlFor="username">Username: </label>
                <input type="text" placeholder="username" />

                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="password" />
                <Link to="/game">
                    <button className="login__button">Login</button>
                </Link>
            </form>
            <Link to="/register">
                <p className="login__footer">Don't have an account? Register here</p>
            </Link>
        </main>
    );
}