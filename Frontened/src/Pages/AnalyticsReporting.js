// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";
// import {
//     LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
//     CartesianGrid, Legend, ResponsiveContainer
// } from "recharts";
// import "./AnalyticsDashboard.css"; // ✅ Import CSS

// const AnalyticsDashboard = () => {
//     const [analyticsData, setAnalyticsData] = useState({
//         attendees: [],
//         booths: [],
//         sessions: [],
//         realTime: { liveAttendees: 0, liveBoothVisitors: 0 }
//     });

//     useEffect(() => {
//         fetchAnalytics();
//     }, []);

//     const fetchAnalytics = async () => {
//         try {
//             const [attendeeRes, boothRes, sessionRes, realTimeRes] = await Promise.all([
//                 axios.get("http://localhost:8000/api/analytics/attendee-engagement"),
//                 axios.get("http://localhost:8000/api/analytics/booth-traffic"),
//                 axios.get("http://localhost:8000/api/analytics/session-popularity"),
//                 axios.get("http://localhost:8000/api/analytics/real-time-analytics")
//             ]);

//             setAnalyticsData({
//                 attendees: attendeeRes.data,
//                 booths: boothRes.data,
//                 sessions: sessionRes.data,
//                 realTime: realTimeRes.data
//             });

//         } catch (error) {
//             console.error("❌ Error fetching analytics data:", error.message);
//         }
//     };

//     return (
//         <Grid container spacing={3} className="analytics-container" width="100%" height={180}>
//             {/* Attendee & Booth Summary */}
//             <Grid item xs={12} md={4}>
//                 <Card className="analytics-card">
//                     <CardContent>
//                         <Typography variant="h6">Total Attendees</Typography>
//                         <Typography variant="h4">{analyticsData.attendees.length}</Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <Card className="analytics-card">
//                     <CardContent>
//                         <Typography variant="h6">Checked-in Attendees</Typography>
//                         <Typography variant="h4">{analyticsData.attendees.reduce((sum, a) => sum + (a.totalAttendees || 0), 0)}</Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} md={4}>
//                 <Card className="analytics-card">
//                     <CardContent>
//                         <Typography variant="h6">Total Booths</Typography>
//                         <Typography variant="h4">{analyticsData.booths.length}</Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Real-Time Analytics */}
//             <Grid item xs={12} md={6}>
//                 <Card className="analytics-card">
//                     <CardContent>
//                         <Typography variant="h6">Live Attendees</Typography>
//                         <Typography variant="h4">{analyticsData.realTime.liveAttendees}</Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} md={6}>
//                 <Card className="analytics-card">
//                     <CardContent>
//                         <Typography variant="h6">Live Booth Visitors</Typography>
//                         <Typography variant="h4">{analyticsData.realTime.liveBoothVisitors}</Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>

//             {/* Booth Traffic Bar Chart */}
//             <Grid item xs={12} md={6}>
//                 <Paper className="analytics-chart">
//                     <Typography className="analytics-chart-title">Booth Traffic</Typography>
//                     <div className="analytics-chart-container">
//                         <ResponsiveContainer>
//                             <BarChart data={analyticsData.booths}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="_id" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Bar dataKey="totalVisitors" fill="#82ca9d" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </Paper>
//             </Grid>

//             {/* Attendee Engagement Line Chart */}
//             <Grid item xs={12} md={6}>
//                 <Paper className="analytics-chart">
//                     <Typography className="analytics-chart-title">Attendee Engagement</Typography>
//                     <div className="analytics-chart-container">
//                         <ResponsiveContainer>
//                             <LineChart data={analyticsData.attendees}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="_id" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Line type="monotone" dataKey="totalAttendees" stroke="#8884d8" />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </Paper>
//             </Grid>

//             {/* Session Popularity Line Chart */}
//             <Grid item xs={12} md={6}>
//                 <Paper className="analytics-chart">
//                     <Typography className="analytics-chart-title">Session Popularity</Typography>
//                     <div className="analytics-chart-container">
//                         <ResponsiveContainer>
//                             <LineChart data={analyticsData.sessions}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="_id" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Line type="monotone" dataKey="totalAttendees" stroke="#ff7300" />
//                             </LineChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </Paper>
//             </Grid>
//         </Grid>
//     );
// };

// export default AnalyticsDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, Legend, ResponsiveContainer
} from "recharts";
import "./AnalyticsDashboard.css"; // ✅ Import Updated CSS

const AnalyticsDashboard = () => {
    const [analyticsData, setAnalyticsData] = useState({
        attendees: [],
        booths: [],
        sessions: [],
        realTime: { liveAttendees: 0, liveBoothVisitors: 0 }
    });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const [attendeeRes, boothRes, sessionRes, realTimeRes] = await Promise.all([
                axios.get("http://localhost:8000/api/analytics/attendee-engagement"),
                axios.get("http://localhost:8000/api/analytics/booth-traffic"),
                axios.get("http://localhost:8000/api/analytics/session-popularity"),
                axios.get("http://localhost:8000/api/analytics/real-time-analytics")
            ]);

            setAnalyticsData({
                attendees: attendeeRes.data,
                booths: boothRes.data,
                sessions: sessionRes.data,
                realTime: realTimeRes.data
            });

        } catch (error) {
            console.error("❌ Error fetching analytics data:", error.message);
        }
    };

    return (
        <div className="analytics-container">
            <div className="analytics-wrapper">
                
                {/* Summary Cards */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Card className="analytics-card">
                            <CardContent>
                                <Typography variant="h6">Total Attendees</Typography>
                                <Typography variant="h4">{analyticsData.attendees.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="analytics-card">
                            <CardContent>
                                <Typography variant="h6">Checked-in Attendees</Typography>
                                <Typography variant="h4">{analyticsData.attendees.reduce((sum, a) => sum + (a.totalAttendees || 0), 0)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className="analytics-card">
                            <CardContent>
                                <Typography variant="h6">Total Booths</Typography>
                                <Typography variant="h4">{analyticsData.booths.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Real-Time Analytics */}
                    <Grid item xs={12} md={6}>
                        <Card className="analytics-card">
                            <CardContent>
                                <Typography variant="h6">Live Attendees</Typography>
                                <Typography variant="h4">{analyticsData.realTime.liveAttendees}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className="analytics-card">
                            <CardContent>
                                <Typography variant="h6">Live Booth Visitors</Typography>
                                <Typography variant="h4">{analyticsData.realTime.liveBoothVisitors}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Charts */}
                <Grid container spacing={3}>
                    {/* Booth Traffic Bar Chart */}
                    <Grid item xs={12} md={6}>
                        <Paper className="analytics-chart">
                            <Typography className="analytics-chart-title">Booth Traffic</Typography>
                            <div className="analytics-chart-container">
                                <ResponsiveContainer>
                                    <BarChart data={analyticsData.booths}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="totalVisitors" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>

                    {/* Attendee Engagement Line Chart */}
                    <Grid item xs={12} md={6}>
                        <Paper className="analytics-chart">
                            <Typography className="analytics-chart-title">Attendee Engagement</Typography>
                            <div className="analytics-chart-container">
                                <ResponsiveContainer>
                                    <LineChart data={analyticsData.attendees}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="totalAttendees" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>

                    {/* Session Popularity Line Chart */}
                    <Grid item xs={12} md={6}>
                        <Paper className="analytics-chart">
                            <Typography className="analytics-chart-title">Session Popularity</Typography>
                            <div className="analytics-chart-container">
                                <ResponsiveContainer>
                                    <LineChart data={analyticsData.sessions}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="totalAttendees" stroke="#ff7300" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
