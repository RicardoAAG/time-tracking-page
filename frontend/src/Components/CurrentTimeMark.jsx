import React, { useState, useEffect } from 'react'

function CurrentTimeMark() {

    const [timelinePosition, setTimelinePosition] = useState("0%");
    const [time, setTime] = useState(new Date());

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

    useEffect(() => {
        fetch(`http://localhost:5299/activity/calculate-timeline-position?achievementTime=${time.toLocaleTimeString()}`)
            .then(response => response.json())
            .then(data => setTimelinePosition(String(data) + "%"))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [time]);

    return (
        <div>
            <div className="seleccionada" style={{ top: timelinePosition , height: `calc(0 * 4.166% + 2px)` }}>
                {formatTime()}
            </div>
        </div>
    )
}

export default CurrentTimeMark