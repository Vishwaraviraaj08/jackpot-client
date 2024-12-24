"use client"
import React from 'react'
import './Spinner.css'

function Spinner() {
    return (
        <div style={{margin:'auto', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        </div>
    )
}

export default Spinner
