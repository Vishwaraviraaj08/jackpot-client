"use client"
import React from 'react'
import './ResultTable.css'
import Spinner from "@/components/Spinner";

function ResultTable({data}) {
    return (
        <>
            <div className="table-container">
                <table className="glass-table">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Token ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row.time}</td>
                            <td>{row.tokenId === '' || row.tokenId === null ? <Spinner/> : row.tokenId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ResultTable
