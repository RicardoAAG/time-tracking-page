import React, { useState, useEffect, useRef } from 'react'
import '../Styles/CurrentTimeMark.css';
import { useTimer } from '../TimerContext.jsx'

function CurrentTimeMark({ start }) {
    const {setTime, elapsedTime, setElapsedTime } = useTimer();
    const [timelinePosition, setTimelinePosition] = useState("0%");
    const [markTime, setMarkTime] = useState(new Date());
    const [markElapsedTime, setMarkElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(0);
    const timerIdRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            return;
        }

        const intervalId = setInterval(() => {
            setMarkTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [isRunning]);

    function formatTime() {
        let hours = markTime.getHours();
        let minutes = markTime.getMinutes();
        let seconds = markTime.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }

    function formatTimer() {
        let hours = Math.floor(markElapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(markElapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(markElapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        if (start) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - markElapsedTime;
            timerIdRef.current = setInterval(() => {
                setMarkElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            setIsRunning(false);
            setTime(markTime);
            setElapsedTime(markElapsedTime);
            setMarkElapsedTime(0);
            startTimeRef.current = 0;
            clearInterval(timerIdRef.current);
        }

        return () => clearInterval(timerIdRef.current);
    }, [start]);

    useEffect(() => {
        fetch(`http://localhost:5299/activity/calculate-timeline-position?achievementTime=${markTime.toLocaleTimeString()}`)
            .then(response => response.json())
            .then(data => setTimelinePosition(String(data) + "%"))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [markTime]);

    return (
        <div>
            <div className="time-container-CT" style={{ top: `calc(${timelinePosition} - 1.5%)` }}>
                {formatTime()}
            </div>
            <div className="seleccionada-CT" style={{ top: `calc(${timelinePosition} + 0px)`, height: `calc(${markElapsedTime / (1000 * 60 * 60)} * 4.166% + 2px)` }}>
                <div className="selected-hour-CT" />
                <div className="duration-container-CT">
                    {formatTimer()}
                </div>
            </div>
        </div>
    )
}

export default CurrentTimeMark