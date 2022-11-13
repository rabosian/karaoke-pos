import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Alert,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Sidebar from "../../../components/Sidebar";
import EmployeesInput from "./EmployeesInput";

const EmployeesPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [msg, setMsg] = useState("");

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

  const addEmployee = async (username, password) => {
    try {
      let response = await api.post("/employees/signup", {
        username,
        password,
      });
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
      setMsg("Employee added successfully");
      setOpenModal(false);

    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const updateEmployee = async (username, password) => {
    try {
      let response = await api.put(`/employees/update/${selected}`, {
        username,
        password,
      });
      console.log(response);
      getEmployees();
      setMsg("Employee updated successfully");
      setOpenModal(false);

    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/delete/${id}`);
      setMsg("Employee deleted successfully");
      getEmployees();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("");
      }, 2000);
    } else if (error) {
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }, [msg, error]);

  useEffect(() => {
    getEmployees();
  }, []);

  const handleModelDelete = (e, cellValues) => {
    if (window.confirm("delete this employee?")) {
      deleteEmployee(cellValues.id);
    }
  };

  const handleModelEdit = (e, cellValues) => {
    setSelected(cellValues.id);
    setOpenModal(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "username", headerName: "Username", width: 130 },
    { field: "role", headerName: "Role", width: 70 },
    { field: "createdAt", headerName: "Created At", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                handleModelDelete(e, cellValues);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                handleModelEdit(e, cellValues);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {msg && (
          <Alert severity="success" sx={{ width: "500px" }}>
            {msg}
          </Alert>
        )}
        <IconButton
          onClick={() => {
            setOpenModal(true);
            setSelected(0);
          }}
        >
          <AddIcon fontSize="large" color="success" />
        </IconButton>

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
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <EmployeesInput
              addEmployee={addEmployee}
              updateEmployee={updateEmployee}
              selected={selected}
              serverError={error}
            />
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeesPage;
