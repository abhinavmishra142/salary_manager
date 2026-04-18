// app/javascript/components/Employees.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  TextField
} from "@mui/material";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    job_title: "",
    country: "",
    salary: ""
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

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
    resetForm();
  };

  const handleUpdate = async () => {
    await axios.put(`/employees/${editingEmployee.id}`, { employee: form });
    fetchEmployees();
    resetForm();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/employees/${id}`);
    fetchEmployees();
  };

  const handleEdit = (emp) => {
    const [first, last] = emp.full_name.split(' ');
    setForm({
      first_name: first || '',
      last_name: last || '',
      job_title: emp.job_title,
      country: emp.country,
      salary: emp.salary
    });
    setEditingEmployee(emp);
  };

  const resetForm = () => {
    setForm({
      first_name: "",
      last_name: "",
      job_title: "",
      country: "",
      salary: ""
    });
    setEditingEmployee(null);
  };

  return (
    <Box mt={4}>
      <h2>Employees</h2>

      <TextField label="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
      <TextField label="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
      <TextField label="Job Title" value={form.job_title} onChange={(e) => setForm({ ...form, job_title: e.target.value })} />
      <TextField label="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
      <TextField label="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />

      <Button onClick={editingEmployee ? handleUpdate : handleCreate}>
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </Button>
      {editingEmployee && (
        <Button onClick={resetForm} color="secondary">
          Cancel
        </Button>
      )}

      {/* TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.full_name}</TableCell>
              <TableCell>{emp.job_title}</TableCell>
              <TableCell>{emp.country}</TableCell>
              <TableCell>{emp.salary}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(emp)}
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
