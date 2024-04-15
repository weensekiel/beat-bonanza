import "./Dashboard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; 
import axios from "axios";

export function Dashboard() {
    const [user, setUser] = useState(null);
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
    
    console.log(user)
    useEffect(() => {
        
    })

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
            <p>Beethoven Virus</p>
            <p>High Scores:</p>
            <ol>
                {/* <li>{scores.score}</li> */}
            </ol>

            <button onClick={handlePlay} className="dashboard__button">play</button>
            <button onClick={handleLogout} className="dashboard__button">Logout</button>
        </main>
    )
}
