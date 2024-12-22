import React, { useState } from "react";
import "./datepicker.css";
import ResultTable from "@/components/ResultTable";
import Spinner from "@/components/Spinner";

const DatePicker = () => {
    // Initialize with the current date
    const today = new Date().toISOString().split("T")[0];
    const [currentDate, setCurrentDate] = useState(today);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleDateChange = (e) => {
        setCurrentDate(e.target.value);
    };

    const handleShowHistory = () => {
        setIsLoading(true);
        fetch(`https://fantasy-api-delta.vercel.app/api/tokenHistory?date=${currentDate}`)
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
                alert("Failed to fetch data.");
            });
    };

    return (
        <>
            <div className="date-picker-container">
                <input
                    id="meeting"
                    type="date"
                    value={currentDate}
                    onChange={handleDateChange}
                    autoFocus={true}
                    className="date-picker-input"
                />
                <button className="animated-buttonnn" onClick={handleShowHistory}>
                    <span>Show History</span>
                    <span></span>
                </button>
            </div>

            {isLoading ? (
                <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:'80px'}}>
                    <Spinner/>
                </div>
            ) : (
                data.length > 0 && (
                    <div>
                        <ResultTable data={data} />
                    </div>
                )
            )}
        </>
    );
};

export default DatePicker;
