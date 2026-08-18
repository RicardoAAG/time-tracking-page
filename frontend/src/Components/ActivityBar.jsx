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
                    {activityMeasured.achievementsByDate.map((achievementObject, index) => (
                        <div key={index} style={{ marginBottom: '12px' }}>
                            <p style={{ margin: '4px 0' }}>
                                <strong>Fecha:</strong> {new Date(achievementObject.dateWhenDone).toLocaleDateString()}
                                |
                                <strong>Hora:</strong> {new Date(achievementObject.dateWhenDone).toLocaleTimeString()}
                                |
                                <strong>Tiempo Realizado:</strong> {achievementObject.timeDone}
                            </p>
                            <ul>
                                {achievementObject.description.map((item, i) => (
                                    <li key={i}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                    }
                </div>
            )}
        </div>
    )
}

export default ActivityBar