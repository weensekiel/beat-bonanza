import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import './GamePage.scss';
import { Lane } from "../../Components/Lane/Lane";
import song from "../../assets/BeethovenVirus.mp3";

export function GamePage() {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(10);
    const [multiplier, setMultiplier] = useState(1);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [play, { stop }] = useSound(song);
    const gameContainerRef = useRef(null);

    const lanes = {
        ArrowUp: document.querySelector(".lane.up"),
        ArrowDown: document.querySelector(".lane.down"),
        ArrowLeft: document.querySelector(".lane.left"),
        ArrowRight: document.querySelector(".lane.right")
    };

    const scoreZones = {
        ArrowUp: document.querySelector(".lane.up .score-zone"),
        ArrowDown: document.querySelector(".lane.down .score-zone"),
        ArrowLeft: document.querySelector(".lane.left .score-zone"),
        ArrowRight: document.querySelector(".lane.right .score-zone")
    };

    const sweetSpots = {
        ArrowUp: document.querySelector(".lane.up .score-zone .sweet-spot"),
        ArrowDown: document.querySelector(".lane.down .score-zone .sweet-spot"),
        ArrowLeft: document.querySelector(".lane.left .score-zone .sweet-spot"),
        ArrowRight: document.querySelector(".lane.right .score-zone .sweet-spot")
    };

    useEffect(() => {
        let intervalId;

        if (isGameRunning) {
            intervalId = setInterval(() => {
                startArrowsAnimation();
            }, 385);
            play();
        } else {
            stopArrowsAnimation();
            setLives(10);
            stop();
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGameRunning, play, stop]);

    useEffect(() => {
        if (lives === 0) {
            setIsGameRunning(false);
            stopArrowsAnimation();
            stop();
        }
    }, [lives, stop]);

    function startArrowsAnimation() {
        const lanes = gameContainerRef.current.querySelectorAll('.lane');

        const numLanes = Math.random() > 0.5 ? 1 : 2;
        const chosenLanes = getRandomLanes(numLanes, lanes);

        chosenLanes.forEach(lane => {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            lane.appendChild(arrow);

            setTimeout(() => {
                if (lane.contains(arrow)) {
                    lane.removeChild(arrow);
                    setLives(prevLives => prevLives - 1);
                    if (lives <= 0) {
                        setIsGameRunning(false);
                        stop();
                    }
                }
            }, 4500);
        });
    }

    function getRandomLanes(numLanes, lanes) {
        const shuffledLanes = Array.from(lanes).sort(() => Math.random() - 0.5);
        return shuffledLanes.slice(0, numLanes);
    }

    function stopArrowsAnimation() {
        const arrows = gameContainerRef.current.querySelectorAll('.arrow');
        arrows.forEach(arrow => arrow.remove());
    };

    function handleStart() {
        setIsGameRunning(true);
        setScore(0);
        setMultiplier(1);
    };


    function handleKeyDown(event) {
        if (!isGameRunning) return;

        const lane = lanes[event.key];

        if (lane) {
            const arrow = lane.querySelector(".arrow");
            if (arrow) {
                const scoreZone = lane.querySelector(".score-zone");

                if (overlaps(arrow, scoreZone)) {
                    const sweetSpot = lane.querySelector(".sweet-spot");
                    if (overlaps(arrow, sweetSpot)) {
                        setScore(prevScore => prevScore + 150); 
                    } else {
                        setScore(prevScore => prevScore + 100);
                    }
                    lane.removeChild(arrow);
                } else {
                    setLives(prevLives => prevLives - 1);
                    if (lives <= 0) {
                        setIsGameRunning(false);
                        stop();
                        setFinalScore(score);
                    }
                }

                updateLivesAndScores();
            }
        }
    };

    function overlaps(el1, el2) {
        const domRect1 = el1.getBoundingClientRect();
        const domRect2 = el2.getBoundingClientRect();

        return !(
            domRect1.top > domRect2.bottom ||
            domRect1.right < domRect2.left ||
            domRect1.bottom < domRect2.top ||
            domRect1.left > domRect2.right
        );
    };

    function updateLivesAndScores() {
        const livesElement = document.querySelector(".game__totals .lives");
        const scoreElement = document.querySelector(".game__totals .score");
        const multiplierElement = document.querySelector(".game__totals .multiplier");

        if (livesElement && scoreElement && multiplierElement) {
            livesElement.textContent = lives;
            scoreElement.textContent = score;
            multiplierElement.textContent = multiplier;
        }
    };

    return (
        <div>
            <div className='game__totals'>
                <div className='game__totals--lives'>
                    Lives: {lives}
                </div>

                <div className='game__totals--score'>
                    Score: {score}
                </div>

                <div className='game__totals--multiplier'>
                    Multiplier: {multiplier}x
                </div>
            </div>

            <div ref={gameContainerRef} className="game__board--container" style={{ '--animation-speed': '4.5s' }}>
                <Lane direction="left" />
                <Lane direction="down" />
                <Lane direction="up" />
                <Lane direction="right" />
            </div>

            {!isGameRunning && (
                <div className="modal">
                    <p>Score: {score}</p>
                    <button className="start" onClick={handleStart}>
                        Play!
                    </button>
                </div>
            )}
        </div>
    );
};
