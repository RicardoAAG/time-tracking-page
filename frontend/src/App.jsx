import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css'
import SideBar from './Components/SideBar'
import ShowActivities from './Pages/ShowActivities.jsx'
import Home from './Pages/Home.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <main style={{ padding: '20px', flexGrow: 1 }}>
          <Routes>
            <Route path="/analytics" element={<ShowActivities />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App