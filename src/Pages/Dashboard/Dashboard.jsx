import "./Dashboard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Dashboard() {
    const [user, setUser] = useState(null);
    const [scores, setScores] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUserData() {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        getUserData();
    }, [id]);


    useEffect(() => {
        async function getUserScores() {
            try {
                const response = await axios.get(`http://localhost:8080/user/${id}/scores`);

                console.log(response.data)
                setScores(response.data);
            } catch (e) {
                console.error(e);
            }
        }

        getUserScores();
    }, [])

    function handleLogout(e) {
        e.preventDefault();
        navigate("/login");
    }

    function handlePlay(e) {
        e.preventDefault();
        navigate("/game");
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <main className="dashboard">
            <h1 className="dashboard__header">Hello, {user.username}!</h1>

            <div className="dashboard__score-container">
                <p>Song: Beethoven Virus</p>
                <p>High Scores:</p>
                <ol>
                    {scores.length === 0 ? (
                        <li>No scores yet</li>
                    ) : (
                        scores
                            .sort((a, b) => b.score - a.score)
                            .slice(0, 5)
                            .map((item, index) => (
                                <li key={index}>{item.score}</li>
                            ))
                    )}
                </ol>
            </div>

            <div className="dashboard__button-container">
                <button onClick={handlePlay} className="dashboard__button">Play 🎵</button>
                <button onClick={handleLogout} className="dashboard__button">Logout</button>
            </div>
        </main>
    )
}