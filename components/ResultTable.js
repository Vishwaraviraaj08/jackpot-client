"use client"
import React, {useEffect} from 'react'
import './ResultTable.css'
import Spinner from "@/components/Spinner";

function ResultTable({data}) {

    function convertTo12HourFormat(time24) {
        const [hours, minutes] = time24.split(':').map(Number);
        const period = hours >= 12 ? 'pm' : 'am';
        const hours12 = hours % 12 || 12;
        return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <> {
            data.length === 0  ? <div className="">No data available</div> :

            <div className="table-container">
                <table className="glass-table">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Results</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        Object.entries(data).map(entry => {
                            let key = entry[0];
                            let value = entry[1];
                            return (
                                <tr key={key}>
                                    <td>{convertTo12HourFormat(key)}</td>
                                    <td>{value === "" ? <Spinner/> : value}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
}
        </>
    )
}

export default ResultTable
