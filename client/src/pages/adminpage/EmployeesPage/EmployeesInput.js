import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Paper,
    TextField,
    Alert,
    Select,
    MenuItem,
    Button,
  } from "@mui/material";
import api from "../../../api";

const EmployeesInput = ({ addEmployee, updateEmployee, selected, serverError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (selected > 0) {
      getEmployeeById();
    }
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  const getEmployeeById = async () => {
    try {
      let response = await api.get(`/employees/${selected}`);
      let data = response.data
      setUsername(data.username)
    } catch (err) {
      console.log(err);
    }
  };

  const add = () => {
    if (
        username === "" ||
        password === ""
      ) {
        setError("field cannot be empty");
        return;
      } else {
        addEmployee(username, password);
        setUsername("");
        setPassword("");
      }
  };
  const update = () => {
    if (
        username === "" ||
        password === ""
      ) {
        setError("field cannot be empty");
        return;
      } else {
        updateEmployee(username, password);
        setUsername("");
        setPassword("");
      }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid align="center">
        <Paper sx={{ padding: 4, width: 350 }}>
        <h4>{selected > 0 ? "Update Employee" : "Add Employee"}</h4>
          {error && <Alert severity="error">{error}</Alert>}
          {serverError && <Alert severity="error">{serverError}</Alert>}
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
            onClick={selected > 0 ? update : add}
          >
            {selected > 0 ? "Update" : "Add"}
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
};

export default EmployeesInput;
