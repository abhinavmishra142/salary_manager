// app/javascript/components/App.jsx
import CountryInsights from "./CountryInsights";
import JobInsights from "./JobInsights";
import { Container } from "@mui/material";

const App = () => {
  return (
    <Container>
      <h1>Salary Dashboard</h1>
      <CountryInsights />
      <JobInsights />
    </Container>
  );
};

export default App;
