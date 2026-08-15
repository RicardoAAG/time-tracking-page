import React, { useState, useEffect } from "react";
import '../Styles/DayTimeline.css';

function DayTimeline({ timelineDate }) {

    const [activities, setActivities] = useState([]);
    const [hours, setHours] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);

    const getDayLabel = (dateToLabel) => {
        const dayToReturn = dateToLabel.toDateString('es-ES', { weekday: 'long' });
        console.log(timelineDate);
        return dayToReturn;
    };

    useEffect(() => {
        fetch(`http://localhost:5299/activity/get-activity-by-date?date=${timelineDate}`)
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, []);

    return (
        <div className="timeline-container">
            {getDayLabel(timelineDate)}
            {hours.map((hour) => (
                <div key={hour} className="hour-slot" title={`${hour}:00`}>
                    <span className="hour-label">{hour}:00</span>
                </div>
            ))}
        </div>
    )
}

export default DayTimeline