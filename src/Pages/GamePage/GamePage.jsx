import "./GamePage.scss"
import React, { useState, useEffect, useRef } from "react";
import arrow from "../../assets/arrow.svg";
import song from "../../assets/BeethovenVirus.mp3";

export function GamePage() {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [isGameRunning, setIsGameRunning] = useState(false);

    function handleStart() {
        setIsGameRunning(true);
    }

    if (isGameRunning) {
        <audio src={song}></audio>
    }

    return (
        <main>
            <div className="game__totals">
                <div className="game__lives">
                    <p>Lives: {lives}</p>
                </div>


                <div className="game__score">
                    <p>Score: {score}</p>
                </div>
            </div>

            <div className="game__play">
                <div className="game__play--left-col"><img src={arrow} /></div>
                <div className="game__play--down-col"><img src={arrow} /></div>
                <div className="game__play--up-col"><img src={arrow} /></div>
                <div className="game__play--right-col"><img src={arrow} /></div>
            </div>


            <button className="game__button" onClick={handleStart}>
                Play!
            </button>
        </main>
    );
}