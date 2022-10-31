import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button } from "@mui/material";
import { authAction } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(authAction.login(username, password));
    navigate("/");
  };

  return (
    <div>
      <Grid align="center" sx={{ mt: 5 }}>
        <Paper sx={{ padding: 7, width: 400 }}>
          <Grid align="center">
            <Avatar></Avatar>
            <h2>Log In</h2>
          </Grid>
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
