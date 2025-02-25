import React from "react";

const AnalyticsCard = ({ title, count }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p>{count}</p>
        </div>
    );
};

export default AnalyticsCard;