import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import arrow from "../../assets/arrow.svg";
import song from "../../assets/BeethovenVirus.mp3";
import "./GamePage.scss";

export function GamePage() {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [multiplier, setMultiplier] = useState(1);
    const [combo, setCombo] = useState(0);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [play, { stop }] = useSound(song);

    useEffect(() => {
        createRow();
    }, []);

    const createRow = () => {
        const arrows = ["left", "down", "up", "right"];
        const newRow = arrows.map((direction, index) => (
            <div className={`game__play--${direction}-col`} key={index}>
                <img src={arrow} alt={direction} />
            </div>
        ));
        return newRow;
    };

    const handleStart = () => {
        setIsGameRunning(true);
    };

    const handleStop = () => {
        setIsGameRunning(false);
        stop();
    };

    return (
        <main>
            <div className="game__totals">
                <div className="game__lives">
                    <p>Lives: {lives}</p>
                </div>
                <div className="game__score">
                    <p>Score: {score}</p>
                </div>
                <div className="game__multiplier">
                    <p>Multiplier: {multiplier}x</p>
                </div>
                <div className="game__combo">
                    <p>Combo: {combo}x</p>
                </div>
            </div>


            <div className="game__play--generator" id="new-row-generator">
                {createRow()}
            </div>

            <button className="game__button" onClick={handleStart}>
                Play!
            </button>
            <button className="game__button" onClick={handleStop}>
                Stop!
            </button>
            <div className="game__play">
                {createRow()}
            </div>
        </main>
    );
}
