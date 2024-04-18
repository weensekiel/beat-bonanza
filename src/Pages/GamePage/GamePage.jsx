import React, { useState, useEffect, useRef } from 'react';
import useSound from 'use-sound';
import './GamePage.scss';
import { Lane } from "../../Components/Lane/Lane";
import song from "../../assets/BeethovenVirus.ogg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function GamePage({ user }) {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(10);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [finalScore, setFinalScore] = useState(0);
    const [play, { stop }] = useSound(song, { onend: handleSongEnd });
    const gameContainerRef = useRef(null);
    const navigate = useNavigate();

    const lanes = {
        ArrowUp: document.querySelector(".lane.up"),
        ArrowDown: document.querySelector(".lane.down"),
        ArrowLeft: document.querySelector(".lane.left"),
        ArrowRight: document.querySelector(".lane.right")
    };

    async function postScore() {
        try {
            const response = await axios.post("http://localhost:8080/user/scores", {
                userId: user.id,
                score: score
            });
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    console.log(finalScore);
    console.log(score);

    useEffect(() => {
        let intervalId;

        if (isGameRunning) {
            intervalId = setInterval(() => {
                startArrowsAnimation();
            }, 740.7407407407408);
            // }, 370.3703703703704); 
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
            setFinalScore(score);
            stop();
        }
    }, [lives, stop, stopArrowsAnimation]);

    useEffect(() => {
        if (!isGameRunning && lives === 0) {
            postScore();
        }
    }, [isGameRunning, lives, score]);

    function startArrowsAnimation() {
        const lanes = gameContainerRef.current.querySelectorAll('.lane');

        const numLanes = Math.random() < 0.75 ? 1 : 2;
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
                        stopArrowsAnimation();
                        setFinalScore(score);
                    }
                }
            }, 2000);
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
    };

    function handleSongEnd() {
        setIsGameRunning(false);
        setFinalScore(score);
        stopArrowsAnimation();
        postScore();
    }

    function handleBack() {
        navigate(-1);
    }

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
                        setFinalScore(prevScore => prevScore + 150);
                    } else {
                        setScore(prevScore => prevScore + 100);
                        setFinalScore(prevScore => prevScore + 100);
                    }
                    lane.removeChild(arrow);
                } else {
                    setLives(prevLives => {
                        const newLives = prevLives - 1;
                        if (newLives <= 0) {
                            setIsGameRunning(false);
                            stop();
                            setFinalScore(score);
                        }
                        return newLives;
                    });
                }
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

    return (
        <main>
            <div className='game__totals'>
                <div className='game__totals--lives'>
                    Lives: {lives}
                </div>

                <div className='game__totals--score'>
                    Score: {score}
                </div>
            </div>

            <div ref={gameContainerRef} className="game__board--container" style={{ '--animation-speed': '2s' }}>
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

                    <button className="start" onClick={handleBack}>
                        Back to Dashboard
                    </button>
                </div>
            )}
        </main>
    );
};
