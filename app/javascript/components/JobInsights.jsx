// app/javascript/components/JobInsights.jsx
import React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { getJobInsights } from "../services/api";
import MetricsCard from "./MetricsCard";

const JobInsights = () => {
  const [country, setCountry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [data, setData] = useState(null);

  const fetchInsights = async () => {
    try {
      const res = await getJobInsights(country, jobTitle);
      setData(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error fetching data");
    }
  };

  return (
    <Box mt={4}>
      <h2>Job Salary Insights</h2>

      <TextField
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        sx={{ mr: 2 }}
      />

      <TextField
        label="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <Button onClick={fetchInsights} variant="contained" sx={{ ml: 2 }}>
        Get Insights
      </Button>

      {data && (
        <Box display="flex" mt={2}>
          <MetricsCard title="Avg Salary" value={data.avg} />
        </Box>
      )}
    </Box>
  );
};

export default JobInsights;
