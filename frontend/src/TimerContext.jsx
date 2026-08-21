import React, { createContext, useContext, useState } from 'react';

const TimerContext = createContext();

export function TimerProvider({ children }) {
  const [time, setTime] = useState(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  return (
    <TimerContext.Provider value={{ time, setTime, elapsedTime, setElapsedTime }}>
      {children}
    </TimerContext.Provider>
  );
}

export const useTimer = () => useContext(TimerContext);