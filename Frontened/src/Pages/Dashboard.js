import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import "../App.css"; 

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalExhibitors: 0,
    totalVisitors: 0,
    totalRevenue: 0,
    totalEvents: 0
  });

  const [visitorData, setVisitorData] = useState([
    { month: "Jan", visitors: 10 },
    { month: "Feb", visitors: 20 },
    { month: "Mar", visitors: 30 }
  ]);

  const [revenueData, setRevenueData] = useState([
    { month: "Jan", revenue: 100 },
    { month: "Feb", revenue: 200 },
    { month: "Mar", revenue: 300 }
  ]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard/stats")
      .then(response => {
        setStats(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="dashboard">
      {/* Top Summary Cards */}
      <div className="dashboard-cards">
        <Card className="card"><CardContent><h3>Total Exhibitors</h3><h2>{stats.totalExhibitors}</h2></CardContent></Card>
        <Card className="card"><CardContent><h3>Total Visitors</h3><h2>{stats.totalVisitors}</h2></CardContent></Card>
        <Card className="card"><CardContent><h3>Total Revenue</h3><h2>${stats.totalRevenue}</h2></CardContent></Card>
        <Card className="card"><CardContent><h3>Total Events</h3><h2>{stats.totalEvents}</h2></CardContent></Card>
      </div>

      {/* Visitor Growth Chart */}
      <div className="chart-container">
        <h3>Visitor Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={visitorData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitors" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Trend Chart */}
      <div className="chart-container">
        <h3>Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
