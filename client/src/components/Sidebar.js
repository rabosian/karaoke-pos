import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { logoutSuccess } from "../redux/reducers/authReducer";

const Sidebar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = async () => {
    if (window.confirm("Are you sure you want to logout/clockout?")) {
      try {
        await api.get("/employees/logout");
        navigate("/")
        dispatch(logoutSuccess());
        console.log("auth: ", auth);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // sidebar control
  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const adminMenu = [
    "Home",
    "Manage Employees",
    "Manage Products",
    "Manage Rooms",
    "Manage Shift",
  ];
  const sidebar = (
    <Box
      sx={{ width: 300 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {auth.role === "ADMIN" ? (
          adminMenu.map((menu) => {
            if (menu === "Home") {
              return (
                <ListItem key={menu} disablePadding>
                  <ListItemButton onClick={() => navigate("/")}>
                    <ListItemText primary={menu} />
                  </ListItemButton>
                </ListItem>
              );
            } else {
              return (
                <ListItem key={menu} disablePadding>
                  <ListItemButton
                    component="a"
                    onClick={() => navigate(`/${menu.toLowerCase().replace(" ", "-")}`)}
                  >
                    <ListItemText primary={menu} />
                  </ListItemButton>
                </ListItem>
              );
            }
          })
        ) : (
          <ListItemText>admin access ONLY</ListItemText>
        )}
        <Divider />
        <ListItemText disablePadding>
          <ListItemButton onClick={userLogout}>Logout</ListItemButton>
        </ListItemText>
      </List>
    </Box>
  );

  return (
    <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)} sx={{ mt: 4, mr: 4 }}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer
          open={isDrawerOpen}
          onClose={toggleDrawer(false)}
          anchor={"right"}
        >
          {sidebar}
        </Drawer>
      </React.Fragment>
    </Box>
  );
};

export default Sidebar;
