import "./RegisterPage.scss";
import { Link } from "react-router-dom";

export function RegisterPage() {
    return (
        <main className="register">
            <h1 className="register__title">Beat Bonanza</h1>
            <h2 className="register__title">Register</h2>
            <form className="register__form">
                <label htmlFor="email">Email: </label>
                <input type="text" placeholder="email" />

                <label htmlFor="username">Username: </label>
                <input type="text" placeholder="username" />

                <label htmlFor="password">Password: </label>
                <input type="password" placeholder="password" />

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" placeholder="confirm password" />

                <Link to="/login">
                    <button className="register__button">Register</button>
                </Link>
            </form>
            <Link to="/login">
                <p className="register__footer">Already have an account? Login here</p>
            </Link>
        </main>
    );
}