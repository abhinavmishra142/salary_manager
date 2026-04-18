// app/javascript/components/Employees.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    full_name: "",
    job_title: "",
    country: "",
    salary: ""
  });

  const [page, setPage] = useState(1);

  const fetchEmployees = async (pageNumber = 1) => {
    const res = await axios.get(`/employees?page=${pageNumber}`);
    setEmployees(res.data.employees);
    setPage(res.data.page);
  };

  useEffect(() => {
    fetchEmployees(page);
  }, []);

  const handleCreate = async () => {
    await axios.post("/employees", { employee: form });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/employees/${id}`);
    fetchEmployees();
  };

  return (
    <Box mt={4}>
      <h2>Employees</h2>

      <TextField label="Name" onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <TextField label="Job" onChange={(e) => setForm({ ...form, job_title: e.target.value })} />
      <TextField label="Country" onChange={(e) => setForm({ ...form, country: e.target.value })} />
      <TextField label="Salary" onChange={(e) => setForm({ ...form, salary: e.target.value })} />

      <Button onClick={handleCreate}>Add</Button>

      {employees.map((emp) => (
        <div key={emp.id}>
          {emp.full_name} - {emp.job_title}
          <Button onClick={() => handleDelete(emp.id)}>Delete</Button>
        </div>
      ))}

      <Box mt={2}>
        <Button
          disabled={page === 1}
          onClick={() => fetchEmployees(page - 1)}
        >
          Previous
        </Button>

        <Button onClick={() => fetchEmployees(page + 1)}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Employees;
