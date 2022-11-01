import React, { useEffect, useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Alert } from "@mui/material";
import { login } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../redux/api";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginRequest = async () => {
    if (!username) {
      setError('username MUST BE provided')
    } else if (!password) {
      setError('password MUST BE provided')
    } else {
      console.log(">>>>>", auth);
      setLoading(true)
      dispatch(login(username, password));
      setLoading(false)
      navigate('/')
    }
  };


  return (
    <div>
      <Grid align="center" sx={{ mt: 5 }}>
        <Paper sx={{ padding: 7, width: 400 }}>
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
            onClick={loginRequest}
          >
            Log In
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default LoginPage;
