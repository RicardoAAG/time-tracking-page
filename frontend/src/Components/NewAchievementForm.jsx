import React, { useState, useEffect } from "react";
import '../Styles/AchievementForm.css';
import { useTimer } from '../TimerContext';

function NewAchievementForm() {

    const { time, elapsedTime } = useTimer();
    const [achivementNumber, setAchivementNumber] = useState(1);

    const [values, setValues] = useState({
        name: '',
        dateWhenDone: '',
        timeDone: '',
        description: [
            ''
        ]
    })

    const achivementNumberChange = (event) => {
        const integerValue = parseInt(event.target.value, 10);
        setAchivementNumber(integerValue);
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

    const handleChanges = (e) => {

    }

    return (
        <div className='form-container'>
            <h1>New Achievement</h1>
            <form>
                <label htmlFor="name">Activity Name</label>
                <input type="text" placeholder='Insert Activity Name' onChange={(e) => handleChanges(e)} />
                <label htmlFor="dateWhenDone">Date</label>
                <input type="text" placeholder={time} disabled onChange={(e) => handleChanges(e)}/>
                <label htmlFor="timeDone">Time Done</label>
                <input type="text" placeholder={formatTimer(elapsedTime)} disabled onChange={(e) => handleChanges(e)}/>
                <label>Achievements
                    <select value={achivementNumber} onChange={achivementNumberChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                    </select>
                </label>
                {Array.from({ length: achivementNumber }).map((_, index) => (
                    <input key={index} type="text" htmlFor="description" placeholder='Insert Achievement' onChange={(e) => handleChanges(e)}/>
                ))}
                <button className='submit-button' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewAchievementForm