import "./Dancepad.scss"

export function Dancepad({onArrowPress}) {
    return (
        <div className="dance-pad">
          <button onClick={() => onArrowPress('up')}>↑</button>
          <button onClick={() => onArrowPress('down')}>↓</button>
          <button onClick={() => onArrowPress('left')}>←</button>
          <button onClick={() => onArrowPress('right')}>→</button>
        </div>
      );
}