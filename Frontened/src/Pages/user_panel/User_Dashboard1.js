import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalExhibitors: 0,
        totalVisitors: 0,
        totalRevenue: 0,
        totalEvents: 0
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/"); // ✅ Agar user login nahi hai, to redirect to Login page
        }

        axios.get("http://localhost:8000/api/dashboard/stats")
            .then(response => {
                setStats(response.data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, [navigate]);

    return (
        <div className="dashboard">
            <h1>Welcome to Dashboard</h1>
            <p>Total Exhibitors: {stats.totalExhibitors}</p>
            <p>Total Visitors: {stats.totalVisitors}</p>
            <p>Total Revenue: ${stats.totalRevenue}</p>
            <p>Total Events: {stats.totalEvents}</p>
        </div>
    );
};

export default Dashboard;
