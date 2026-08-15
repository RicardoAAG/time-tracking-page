import React, { useState, useEffect } from "react";
import ActivityBar from '../Components/ActivityBar.jsx'

const ShowActivities = () => {
    const [activities, setActivities] = useState([]);
    const [isOrdered, setIsOrdered] = useState(false);
    const [maxActivitytime, setMaxActivitytime] = useState(0);

    useEffect(() => {
        // Seleccionamos la URL según el estado 'isOrdered'
        const url = isOrdered
            ? 'http://localhost:5299/activity/ordered'
            : 'http://localhost:5299/activity';

        fetch(url)
            .then(response => response.json())
            .then(data => setActivities(data))
            .catch(error => console.error('Error al conectar con C#:', error));
        console.log(activities);
    }, [isOrdered]);

    useEffect(() => {
        fetch('http://localhost:5299/activity/maxactivitytime')
            .then(response => response.json())
            .then(data => setMaxActivitytime(data))
            .catch(error => console.error('Error al conectar con C#:', error));
    }, [])

    if (activities.length == 0) {
        return (
            <div>
                <h2>Lista de Actividades</h2>
                <p>No se encontraron actividades.</p>
            </div>
        );
    } else {
        return (
            <div>
                <h2>Lista de Actividades</h2>
                <button onClick={() => setIsOrdered(!isOrdered)}>
                    {isOrdered ? "Ver en orden original" : "Ordenar por tiempo"}
                </button>
                <ul>
                    {activities.map((activity) => (
                        <div key={activity.id} style={{ marginBottom: "5px"}}>
                            <ActivityBar activityMeasured={activity} maxProgress={maxActivitytime} />
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
};

export default ShowActivities;