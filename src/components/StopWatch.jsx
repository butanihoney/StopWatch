import React, { useState, useRef } from 'react';
import '../styles/Stopwatch.css';

const StopWatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [hasStopped, setHasStopped] = useState(false);
    const timerRef = useRef(null);

    const handleStartPause = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
        } else {
            if (hasStopped) {
                setTime(0);
                setHasStopped(false);
            }
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const handleStop = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setHasStopped(true);
    };

    const handleReset = () => {
        clearInterval(timerRef.current);
        setTime(0);
        setIsRunning(false);
        setHasStopped(false);
    };

    const formatTime = (time) => {
        const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        return `${minutes}:${seconds}:${milliseconds}`;
    };

    return (
        <div className="container">
            <div className="stopwatch">
                <h1>StopWatch</h1>
                <div className="time">{formatTime(time)}</div>
                <div className="buttons">
                    <button className='btn start' onClick={handleStartPause}>
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button className='btn stop' onClick={handleStop}>Stop</button>
                    <button className='btn reset' onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default StopWatch;
