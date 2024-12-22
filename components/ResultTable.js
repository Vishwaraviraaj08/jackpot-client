"use client"
import React, {useEffect} from 'react'
import './ResultTable.css'
import Spinner from "@/components/Spinner";

function ResultTable({data}) {

    useEffect(() => {
        console.log("inside resultable", data)
    }, []);

    return (
        <> {
            data.length === 0  ? <div className="">No data available</div> :

            <div className="table-container">
                <table className="glass-table">
                    <thead>
                    <tr>
                        <th>Time</th>
                        <th>Token ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        Object.entries(data).map(entry => {
                            let key = entry[0];
                            let value = entry[1];
                            return (
                                <tr key={key}>
                                    <td>{key}</td>
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
