// app/javascript/components/MetricsCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const MetricsCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 200, margin: 1 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5">
          {value !== null && value !== undefined ? value : "N/A"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
