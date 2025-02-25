import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AnalyticsCard from "../Components/AnalyticsCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CustomButton from "../Components/CustomButton";

const AnalyticsReporting = () => {
    const { expoId } = useParams(); // Get expoId from URL
    console.log("🚀 Expo ID from useParams:", expoId);

    const [analyticsData, setAnalyticsData] = useState([]);
    const [realTimeData, setRealTimeData] = useState([]);
    const [error, setError] = useState(null);

    // ✅ Validate MongoDB ObjectId without mongoose
    const isValidObjectId = (id) => /^[a-f\d]{24}$/i.test(id);

    const fetchAnalytics = useCallback(async () => {
        if (!expoId || !isValidObjectId(expoId)) {
            setError("⚠️ Invalid or missing Expo ID.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/analytics/${expoId}`);
            setAnalyticsData(response.data || []);
        } catch (error) {
            console.error("❌ Error fetching analytics:", error);
            setError("Failed to fetch analytics.");
        }
    }, [expoId]);

    const fetchRealTimeAnalytics = useCallback(async () => {
        if (!expoId || !isValidObjectId(expoId)) {
            setError("⚠️ Invalid or missing Expo ID.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/api/analytics/realtime/${expoId}`);
            setRealTimeData(response.data || []);
        } catch (error) {
            console.error("❌ Error fetching real-time analytics:", error);
            setError("Failed to fetch real-time analytics.");
        }
    }, [expoId]);

    useEffect(() => {
        fetchAnalytics();
        fetchRealTimeAnalytics();
    }, [expoId, fetchAnalytics, fetchRealTimeAnalytics]);

    if (error) {
        return <div style={{ color: "red", fontWeight: "bold" }}>{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📊 Analytics Dashboard</h2>

            <div className="grid grid-cols-3 gap-4">
                <AnalyticsCard title="Attendee Engagement" count={analyticsData.find(a => a.type === "attendee")?.data?.count || 0} />
                <AnalyticsCard title="Booth Traffic" count={analyticsData.find(a => a.type === "booth")?.data?.count || 0} />
                <AnalyticsCard title="Session Popularity" count={analyticsData.find(a => a.type === "session")?.data?.count || 0} />
            </div>

            <h3 className="text-xl font-semibold mt-6">📈 Engagement Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={realTimeData}>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="data.count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <CustomButton onClick={fetchRealTimeAnalytics}>🔄 Refresh Data</CustomButton>
        </div>
    );
};

export default AnalyticsReporting;
