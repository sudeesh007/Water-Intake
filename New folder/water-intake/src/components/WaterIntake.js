import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import checkAuth from "./auth/checkauth";


function WaterIntake() {
    const [waterIntake, setWaterIntake] = useState(0);
    const [userName, setUserName] = useState("");
    const [waterEntries, setWaterEntries] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(2);
    const [errorMessage, setErrorMessage] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [userWaterIntakeDifference, setUserWaterIntakeDifference] = useState(0);

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem("waterEntries")) || [];
        setWaterEntries(storedEntries);
    }, []);

    const handleWaterIntakeChange = (event) => {
        const newWaterIntake = parseInt(event.target.value);
        setWaterIntake(newWaterIntake);
    };

    const handleNameChange = (event) => {
        const newName = event.target.value;
        setUserName(newName);
    };

    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);
    };

    const handleWaterIntakeSubmit = (event) => {
        event.preventDefault();
        const today = new Date().toLocaleDateString();
        const existingEntry = waterEntries.find(entry => entry.userName === userName && entry.date === today);
        
        if (existingEntry) {
            setErrorMessage("You have already added water intake for today.");
        } else {
            const newEntry = { userName, waterIntake, date: today };
            const updatedEntries = [...waterEntries, newEntry];
            setWaterEntries(updatedEntries);
            localStorage.setItem("waterEntries", JSON.stringify(updatedEntries));
            setWaterIntake(0);
            setUserName("");
            setErrorMessage("");
        }
    };

    const handleEditEntry = (index) => {
        const entryToEdit = waterEntries[index];
        setWaterIntake(entryToEdit.waterIntake);
        setUserName(entryToEdit.userName);
        setEditIndex(index);
    };

    const handleDeleteEntry = (index) => {
        const updatedEntries = [...waterEntries];
        updatedEntries.splice(index, 1);
        setWaterEntries(updatedEntries);
        localStorage.setItem("waterEntries", JSON.stringify(updatedEntries));
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = waterEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const calculateWaterIntakeDifference = (userName, startDate, endDate) => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const filteredEntries = waterEntries.filter(entry => entry.userName === userName && new Date(entry.date) >= startDateObj && new Date(entry.date) <= endDateObj);
        const totalWaterIntake = filteredEntries.reduce((total, entry) => total + entry.waterIntake, 0);
        return totalWaterIntake;
    };

    const handleCalculateDifference = () => {
        if (userName && startDate && endDate) {
            const difference = calculateWaterIntakeDifference(userName, startDate, endDate);
            setUserWaterIntakeDifference(difference);
        } else {
            setErrorMessage("Please fill in all fields to calculate the difference.");
        }
    };

    const containerStyle = {
        backgroundImage: `url("https://wallpapers.com/images/hd/glaring-pool-water-hd-7hzd7xgezbc46ade.jpg")`, 
        backgroundSize: 'cover', 
        minHeight: '100vh', 
    };

    return (
        <div style={containerStyle}>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h2>Water Intake</h2>
                        <form onSubmit={handleWaterIntakeSubmit}>
                            <label>Enter Your Name:</label>
                            <input
                                type="text"
                                value={userName}
                                onChange={handleNameChange}
                                required
                            />
                            <br />
                            <label>Enter Water Intake (ml):</label>
                            <input
                                type="number"
                                value={waterIntake}
                                onChange={handleWaterIntakeChange}
                                min="0"
                                required
                            />
                            <button className="btn btn-small btn-success" type="submit">
                                {editIndex !== null ? "Update" : "Add"}
                            </button>
                        </form>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <br />
                        <h3>Water Intake History</h3>
                        <ul>
                            {currentEntries.map((entry, index) => (
                                <li key={index}>
                                    {entry.userName}: {entry.waterIntake} ml (Added: {entry.date})
                                    <button onClick={() => handleEditEntry(index)}>Edit</button>
                                    <button onClick={() => handleDeleteEntry(index)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                        {/* Pagination */}
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(waterEntries.length / entriesPerPage) }).map((_, index) => (
                                <li key={index} className="page-item">
                                    <button onClick={() => paginate(index + 1)} className="page-link">
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <h3>Find Water Intake Difference</h3>
                        <label>Enter Your Name:</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={handleNameChange}
                            required
                        />
                        <br />
                        <label>Start Date:</label>
                        <input type="date" value={startDate} onChange={handleStartDateChange} />
                        <br />
                        <label>End Date:</label>
                        <input type="date" value={endDate} onChange={handleEndDateChange} />
                        <br />
                        <button onClick={handleCalculateDifference}>Calculate Difference</button>
                        {userWaterIntakeDifference !== 0 && (
                            <p>Water intake difference between {startDate} and {endDate} for {userName}: {userWaterIntakeDifference} ml</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(WaterIntake);
