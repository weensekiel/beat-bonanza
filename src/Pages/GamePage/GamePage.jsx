import "./GamePage.scss"
import React, { useState, useEffect, useRef } from "react";

export function GamePage() {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [isGameRunning, setIsGameRunning] = useState(false);

    return (
        <>
            <div className="lives">
                Lives:
                <span className="score">{lives}</span>
            </div>

            <div className="points">
                Score:
                <span className="score">0</span>
            </div>
            <div className="container" >
                <div className="lane left">
                    <div className="score-zone">
                        <div className="sweet-spot"></div>
                    </div>
                </div>
                <div className="lane up">
                    <div className="score-zone">
                        <div className="sweet-spot"></div>
                    </div>
                </div>
                <div className="lane down">
                    <div className="score-zone">
                        <div className="sweet-spot"></div>
                    </div>
                </div>
                <div className="lane right">
                    <div className="score-zone">
                        <div className="sweet-spot"></div>
                    </div>
                </div>
            </div>

            <div className="modal">
                <p>
                    High score: <span className="score">0</span>
                </p>
                <p>
                    <button id="start">
                        Play!
                    </button>
                </p>
            </div>
        </>
    );
}