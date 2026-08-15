import React, { useState, useEffect } from "react";
import '../Styles/ActivityBar.css'

function ActivityBar({ activityMeasured, maxProgress }) {

    const currentProgress = (activityMeasured.totalMinutes / maxProgress) * 100;
    const [hours, minutes, seconds] = activityMeasured.timeDone.split(':').map(Number);
    const [isOpened, setIsOpened] = useState(false);

    function toggle() {
        setIsOpened(wasOpened => !wasOpened);
    }

    return (
        <div className='ActivityBar'>
            <div id='outer' onClick={toggle}>
                <div id='inner' style={{ width: `${currentProgress}%` }}>
                    {activityMeasured.name} #{activityMeasured.id}
                    <div />
                    {hours}h {minutes}m {seconds}s
                </div>
            </div>
            {isOpened && (
                <div id='info-section'>
                    {activityMeasured.achievementsByDate &&
                        Object.entries(activityMeasured.achievementsByDate).map(([dateStr, achievementsList], index) => (
                            <div key={index} style={{ marginBottom: '12px' }}>
                                {/* Formateamos la fecha clave del diccionario */}
                                <p style={{ margin: '4px 0' }}>
                                    <strong>Fecha:</strong> {new Date(dateStr).toLocaleDateString()}
                                </p>

                                {/* Iteramos sobre la lista de logros de esta fecha */}
                                <ul>
                                    {achievementsList && achievementsList.map((achievement, i) => (
                                        <li key={i}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}

export default ActivityBar