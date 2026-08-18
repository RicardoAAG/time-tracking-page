import React, { useState, useEffect } from "react";
import DayTimeline from '../Components/DayTimeline.jsx'
import '../Styles/Home.css';

function Home() {
  const [activities, setActivities] = useState([]);
  const itemsToShow = 3;
  const [offset, setOffset] = useState(0);
  const [isStart, setIsStart] = useState(true)
  const startIndex = 0;

  const getDayLabel = (daysAgo) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  };

  const dates = [
    getDayLabel(offset + 2),
    getDayLabel(offset + 1),
    getDayLabel(offset)
  ];

  const handlePrev = () => {
    setOffset((prev) => prev + itemsToShow);
  };

  const handleNext = () => {
    setOffset((prev) => prev - itemsToShow);
  };

  const chechIfStart = () => {
    if (offset == 0) {
      setIsStart(true);
    } else {
      setIsStart(false);
    }
  }

  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push(dates[i]);
    }
    return visible;
  };

  useEffect(() => {
    fetch('http://localhost:5299/activity')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error al conectar con C#:', error));
  }, []);

  useEffect(() => {
    chechIfStart();
  }, [dates]);

  return (
    <div className="carousel-wrapper">
      <button className="navigation-button" onClick={() => { handlePrev() }}>
        &#10094; Prev
      </button>
      <div className="carousel-container">
        {/* {getVisibleItems().map((dates) => ( */}
          <DayTimeline timelineDate={dates[0]} />
          <DayTimeline timelineDate={dates[1]} />
          <DayTimeline timelineDate={dates[2]} />
        {/* ))}*/}
      </div>
      {!isStart && (
        <button className="navigation-button" onClick={handleNext}>
          Next &#10095;
        </button>
      )}
    </div>
  )
}

export default Home