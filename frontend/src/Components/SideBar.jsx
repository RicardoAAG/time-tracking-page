import React from 'react'
import '../Styles/SideBar.css'
import { SideBarData } from './SideBarData.jsx'

function SideBar() {
    return (
        <div className='SideBar'>
            <ul className="SideBarList">
                {SideBarData.map((val, key) => {
                    return (
                        <li key={key} id={window.location.pathname == val.link ? "active" : ""} className="row" onClick={() => { window.location.pathname = val.link }}>
                            <div id="icon">{val.icon}</div>
                            <div id="title">{val.title}</div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SideBar