import React, { useEffect, useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "../redux/reducers/authReducer";
import api from "../api";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const body = { username, password }
    try {
      setLoading(true)
      let response = await api.post("/employees/login", body, { withCredentials: true })
      dispatch(loginSuccess({ username: response.data.employee}))
      navigate("/")
    } catch (err) {
      let error = err.response.data.error
      setError(error)
      dispatch(loginFailed())
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Grid align="center" sx={{ mt: 10 }}>
        <Paper sx={{ padding: 7, width: 500 }}>
          <Grid align="center">
            <Avatar></Avatar>
            <h2>Log In</h2>
          </Grid>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            required
            variant="standard"
            type="text"
            fullWidth
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            required
            variant="standard"
            type="password"
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 4 }}
            style={{ backgroundColor: "#11262f" }}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default LoginPage;
