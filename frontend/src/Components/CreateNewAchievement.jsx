import React, { useState, useEffect, useRef } from 'react'

function CreateNewAchievement({ onThisStart, onThisStop }) {

    return (
        <div>
            <button onClick={() => onThisStart()}>
                Empezar
            </button>
            <button onClick={() => {onThisStop(); }}>
                Detener
            </button>
        </div>
    )
}

export default CreateNewAchievement