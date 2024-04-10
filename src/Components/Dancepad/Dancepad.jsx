import "./Dancepad.scss";
import arrow from "../../assets/arrow.svg";

export function Dancepad({ onArrowPress }) {
  return (
    <div className="dance-pad">
      <button onClick={() => onArrowPress('up')}><img src={arrow} alt="Up" /></button>
      <button onClick={() => onArrowPress('down')}><img src={arrow} alt="Down" /></button>
      <button onClick={() => onArrowPress('left')}><img src={arrow} alt="Left" /></button>
      <button onClick={() => onArrowPress('right')}><img src={arrow} alt="Right" /></button>
    </div>
  );
}
