import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api";
import Sidebar from "../../components/Sidebar";

const EmployeesPage = () => {
  const [users, setUsers] = useState([]);

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


  useEffect(() => {
    getEmployees();
  }, []);


  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "role", headerName: "Role", width: 70 },
    // weekly work hours
    { field: "createdAt", headerName: "weekly work hours", width: 160 },

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
        Manage Shift Payment
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Box sx={{ height: 700, width: "630px" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              disableSelectionOnClick
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeesPage;
