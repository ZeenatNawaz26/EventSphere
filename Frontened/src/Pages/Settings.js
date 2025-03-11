import React, { useState, useEffect } from "react";
import axios from "axios";

const Settings = () => {
    const [settings, setSettings] = useState({
        theme: "light",
        notifications: true,
        privacy: { showProfile: true, allowMessages: true },
        security: { twoFactorAuth: false }
    });

    useEffect(() => {
        fetch("http://localhost:8000/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setSettings((prev) => ({
                        ...prev,
                        ...data, 
                        privacy: { ...prev.privacy, ...data.privacy },
                        security: { ...prev.security, ...data.security }
                    }));
                }
            })
            .catch((error) => console.error("Error fetching settings:", error));
    }, []);

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;

        setSettings((prev) => {
            const keys = name.split(".");
            if (keys.length > 1) {
                // Handle nested updates
                return {
                    ...prev,
                    [keys[0]]: {
                        ...prev[keys[0]],
                        [keys[1]]: type === "checkbox" ? checked : value
                    }
                };
            }
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            };
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.put("http://localhost:8000/api/settings", settings);
            console.log("✅ Settings updated:", response.data);
        } catch (error) {
            console.error("❌ Error updating settings:", error.response?.data || error.message);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}>
            <h2 style={{ textAlign: "center" }}>Settings</h2>

            <div style={{ marginBottom: "10px" }}>
                <label>Theme:</label>
                <select name="theme" value={settings.theme} onChange={handleChange} style={{ width: "100%", padding: "8px", marginTop: "5px" }}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Enable Notifications:</label>
                <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Show Profile:</label>
                <input
                    type="checkbox"
                    name="privacy.showProfile"
                    checked={settings.privacy.showProfile}
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                />
            </div>

            <div style={{ marginBottom: "10px" }}>
                <label>Two-Factor Authentication:</label>
                <input
                    type="checkbox"
                    name="security.twoFactorAuth"
                    checked={settings.security.twoFactorAuth}
                    onChange={handleChange}
                    style={{ marginLeft: "10px" }}
                />
            </div>

            <button onClick={handleSave} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Save Settings</button>
        </div>
    );
};

export default Settings;
