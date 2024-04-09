import { Link } from "react-router-dom";
import "./LeaderboardsPage.scss";

export function LeaderboardsPage() {
    return (
        <main className="leaderboards">
            <h1>Leaderboards</h1>
            
            <ol>
                <li>513452</li>
                <li>503269</li>
                <li>475693</li>
            </ol>

            <Link to="/game">
            <button>PLAY</button>
            </Link>
        </main>

    );
}