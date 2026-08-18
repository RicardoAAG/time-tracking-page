import React, { useState, useEffect } from "react";
import '../Styles/DayTimeline.css';
import TimelineAchievement from "./TimelineAchievement";

function DayTimeline({ timelineDate }) {

    const [achievements, setAchievements] = useState([]);
    const [hours, setHours] = useState([24, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);

    const getDayLabel = (dateToLabel) => {
        const dayToReturn = dateToLabel.toDateString('es-ES', { weekday: 'long' });
        return dayToReturn;
    };

    useEffect(() => {
        const formattedDate = timelineDate.toISOString();
        fetch(`http://localhost:5299/activity/get-achievement-by-date?dateToFind=${formattedDate}`)
            .then(response => response.json())
            .then(data => setAchievements(data))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [timelineDate]);

    // useEffect(() => {
    //     console.log(achievements);
    // }, [achievements]);

    return (
        <div className="body">
            <div className="date-container">
                {getDayLabel(timelineDate)}
            </div>

            <div className="timeline-container">
                {hours.map((hour) => (
                    <div key={hour} className="hour-row">
                        <div className="hour-label-container">
                            <span className="hour-label">{hour}:00</span>
                        </div>
                        <div className="hour-content-slot"></div>
                    </div>
                ))}
                {achievements.length > 0 && achievements.map((achievementObject) => (
                    <TimelineAchievement key={achievementObject.id} achievement = {achievementObject}/>
                ))}
            </div>
        </div>
    );
}

export default DayTimeline