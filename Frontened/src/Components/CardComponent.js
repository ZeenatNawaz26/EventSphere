import React from "react";
import { Card, CardContent } from "@mui/material";
import "./CardComponent.css";

const CardComponent = ({ icon: Icon, title, value }) => {
  return (
    <Card className="dashboard-card">
      <CardContent>
        {Icon && <Icon className="card-icon" />}
        <h3>{title}</h3>
        <p>{value !== undefined ? value : "N/A"}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
