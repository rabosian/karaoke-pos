import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Sidebar from "../../../components/Sidebar";

const EmployeesPage = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const getEmployees = async () => {
    try {
      let response = await api.get("/employees");
      let data = response.data;
      let arr = [];
      data.map((user) => {
        arr.push({
          id: user.id,
          username: user.username,
          role: "admin",
          createdAt: user.createdAt.slice(0, 10),
        });
      });
      setUsers(arr);
    } catch (err) {
      console.log("error", err);
    }
  };

  const addEmployee = async (e) => {
    try {
      let body = { username, password };
      let response = await api.post("/employees/signup", body);
      let data = response.data;
      setUsers((prev) => [
        ...prev,
        {
          id: data.id,
          username: data.username,
          role: "admin",
          createdAt: data.createdAt.slice(0, 10),
        },
      ]);
      setUsername("")
      setPassword("")
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "role", headerName: "Role", width: 70 },
    { field: "createdAt", headerName: "Created At", width: 120 },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
  }));

  return (
    <Box>
      <Sidebar />
      <Typography variant="h3" sx={{ textAlign: "center", my: 3 }}>
        Manage Employees
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ height: 700, width: "550px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <Box sx={{ height: 400, width: "50%" }}>
          <Grid align="center">
            <h4>add employee</h4>
            <Paper sx={{ padding: 4, width: 350 }}>
              {error && <Alert severity="error">{error}</Alert>}
              <TextField
                required
                variant="standard"
                fullWidth
                value={username}
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                required
                variant="standard"
                fullWidth
                value={password}
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Select
                sx={{ mt: 2, width: "100px" }}
                size="small"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem key="1" value="admin">
                  admin
                </MenuItem>
                <MenuItem key="2" value="employee">
                  employee
                </MenuItem>
              </Select>
              <Button
                variant="contained"
                sx={{ mt: 2, display: "block" }}
                style={{ backgroundColor: "#11262f" }}
                onClick={addEmployee}
              >
                Add
              </Button>
            </Paper>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeesPage;
