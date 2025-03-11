import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../App.css";
import CardComponent from "../Components/CardComponent";
import { FaUsers, FaChartLine, FaMoneyBillWave, FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({
    totalExhibitors: 0,
    totalVisitors: 0,
    totalRevenue: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    console.log("Dashboard Component Loaded");
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== "/dashboard" && !location.pathname.startsWith("/admin")) {
      navigate("/dashboard", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/dashboard/stats")
      .then((response) => {
        console.log("✅ Stats received:", response.data);
        setStats(response.data);
      })
      .catch((error) => console.error("❌ Error fetching stats:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to Dashboard</h1>
      {stats ? (
        <div className="dashboard-cards">
          <CardComponent icon={FaUsers} title="Total Exhibitors" value={stats.totalExhibitors || 0} />
          <CardComponent icon={FaChartLine} title="Total Visitors" value={stats.totalVisitors || 0} />
          <CardComponent icon={FaMoneyBillWave} title="Total Revenue" value={`$${stats.totalRevenue || 0}`} />
          <CardComponent icon={FaCalendarAlt} title="Total Events" value={stats.totalEvents || 0} />
        </div>
      ) : (
        <p>Loading dashboard data...</p>
      )}
    </div>
  );
};

export default Dashboard;
