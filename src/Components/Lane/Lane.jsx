import { ScoreZone } from "../ScoreZone/ScoreZone";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";

export function Lane({ direction }) {
    let arrowSrc;
    switch (direction) {
        case 'up':
            arrowSrc = arrowUp;
            break;
        case 'down':
            arrowSrc = arrowDown;
            break;
        case 'left':
            arrowSrc = arrowLeft;
            break;
        case 'right':
            arrowSrc = arrowRight;
            break;
        default:
            arrowSrc = arrowUp; // Default to arrow pointing up
            break;
    }

    return (
        <div className={`lane ${direction}`}>
            <img src={arrowSrc} className="arrow" alt={`Arrow pointing ${direction}`} />
            <ScoreZone />
        </div>
    );
};