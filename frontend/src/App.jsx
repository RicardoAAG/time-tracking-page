import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Styles/App.css'
import SideBar from './Components/SideBar'
import ShowActivities from './Pages/ShowActivities.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <SideBar />
        <main style={{ padding: '20px', flexGrow: 1 }}>
          <Routes>
            <Route path="/analytics" element={<ShowActivities />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App