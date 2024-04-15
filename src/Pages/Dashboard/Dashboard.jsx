import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";

export function Dashboard({ user }) {
    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        navigate("/login");
    }

    function handlePlay(e) {
        e.preventDefault();
        navigate("/game");
    }

    return (
        <main>
            <h1>Hello, {user.username}!</h1>

            <button onClick={handlePlay}>play</button>
            <button onClick={handleLogout}>Logout</button>
        </main>
    )
}