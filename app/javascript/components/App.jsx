import React, { useState } from "react";
import { Container, Tabs, Tab, Box } from "@mui/material";
import Employees from "./Employees";
import CountryInsights from "./CountryInsights";
import JobInsights from "./JobInsights";

const App = () => {
  const [tab, setTab] = useState(0);

  return (
    <Container>
      <h1>Salary Dashboard</h1>

      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
        <Tab label="Employees" />
        <Tab label="Country Insights" />
        <Tab label="Job Insights" />
      </Tabs>

      <Box mt={3}>
        {tab === 0 && <Employees />}
        {tab === 1 && <CountryInsights />}
        {tab === 2 && <JobInsights />}
      </Box>
    </Container>
  );
};

export default App;
