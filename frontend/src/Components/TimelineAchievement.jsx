import React, { useState, useEffect } from "react";

function TimelineAchievement({ achievement }) {

    const [timelinePosition, setTimelinePosition] = useState("0%");

    const parseTimeToDecimal = (timeString) => {
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const decimalHours = hours + minutes / 60 + seconds / 3600;

        // Redondea a 2 decimales
        console.log(decimalHours * 100 / 100);
        return Math.round(decimalHours * 100) / 100;
    };

    const [timelineDuration, setTimelineduration] = useState(parseTimeToDecimal(achievement.timeDone));

    useEffect(() => {
        // console.log(new Date(achievement.dateWhenDone).toLocaleTimeString());
        console.log(achievement.timeDone);
        fetch(`http://localhost:5299/activity/calculate-timeline-position?achievementTime=${new Date(achievement.dateWhenDone).toLocaleTimeString()}`)
            .then(response => response.json())
            .then(data => setTimelinePosition(String(data) + "%"))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [achievement]);

    return (
        <div>
            <div className="seleccionada" style={{ top: timelinePosition, height: `calc(${timelineDuration} * 4.166% + 2px)` }}>
                <div className="selected-hour" />
            </div>
        </div>
    )
}

export default TimelineAchievement