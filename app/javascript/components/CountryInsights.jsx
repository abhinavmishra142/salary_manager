// app/javascript/components/CountryInsights.jsx
import React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { getCountryInsights } from "../services/api";
import MetricsCard from "./MetricsCard";

const CountryInsights = () => {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);

  const fetchInsights = async () => {
    try {
      const res = await getCountryInsights(country);
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error fetching data");
    }
  };

  return (
    <Box mt={4}>
      <h2>Country Salary Insights</h2>

      <TextField
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />

      <Button onClick={fetchInsights} variant="contained" sx={{ ml: 2 }}>
        Get Insights
      </Button>

      {data && (
        <Box display="flex" mt={2}>
          <MetricsCard title="Min Salary" value={data.min} />
          <MetricsCard title="Max Salary" value={data.max} />
          <MetricsCard title="Avg Salary" value={data.avg} />
          <MetricsCard title="Employee Count" value={data.count} />
        </Box>
      )}
    </Box>
  );
};

export default CountryInsights;
