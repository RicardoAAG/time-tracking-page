import React, { useState, useEffect, useRef } from 'react'
import '../Styles/CurrentTimeMark.css';

function CurrentTimeMark({ start }) {

    const [timelinePosition, setTimelinePosition] = useState("0%");
    const [time, setTime] = useState(new Date());
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const startTimeRef = useRef(0);
    const timerIdRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }

    function formatTimer() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}`;
    }

    useEffect(() => {
        if (start) {
            setIsRunning(true);
            startTimeRef.current = Date.now() - elapsedTime;
            timerIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        } else {
            setIsRunning(false);
            setElapsedTime(0);
            startTimeRef.current = 0;
            clearInterval(timerIdRef.current);
        }

        return () => clearInterval(timerIdRef.current);
    }, [start]);

    useEffect(() => {
        fetch(`http://localhost:5299/activity/calculate-timeline-position?achievementTime=${time.toLocaleTimeString()}`)
            .then(response => response.json())
            .then(data => setTimelinePosition(String(data) + "%"))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [time]);

    return (
        <div>
            <div className="time-container-CT" style={{ top: `calc(${timelinePosition} - 1.5%)` }}>
                {formatTime()}
            </div>
            <div className="seleccionada-CT" style={{ top: `calc(${timelinePosition} + 1px)`, height: `calc(${elapsedTime / (1000 * 60 * 60)} * 4.166% + 2px)` }}>
                <div className="selected-hour-CT" />
                <div className="duration-container-CT">
                    {formatTimer()}
                </div>
            </div>
        </div>
    )
}

export default CurrentTimeMark