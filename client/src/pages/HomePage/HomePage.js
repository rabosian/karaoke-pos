import {
  Grid,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./HomePage.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RoomCard from "../../components/RoomCard/RoomCard";

// TO DO
// 1. RoomCard render할 때마다 Order info data fetch (useEffect, setTimeout)
// - isKorean, customer_num, date, total
// 2. isActive == true인 room은 다른색으로 표시
// 3. update time every minute
const HomePage = () => {
  const auth = useSelector((state) => state.auth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // sidebar control
  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };
  const adminMenu = ["Manage Employees", "Manage Products", "Manage Rooms"];
  const sidebar = (
    <Box
      sx={{ width: 300 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {auth.role === "ADMIN" ? (
          adminMenu.map((menu) => (
            <ListItem key={menu} disablePadding>
              <ListItemButton
                component="a"
                href={menu.toLowerCase().replace(" ", "-")}
              >
                <ListItemText primary={menu} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItemText>admin access ONLY</ListItemText>
        )}
        <Divider />
      </List>
    </Box>
  );

  return (
    <div className={styles.screen}>
      <div className={styles.menuBar} onClick={toggleDrawer}>
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
      </div>
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <Typography variant="h4">Dolphin Karaoke</Typography>
      </Grid>
      <div className={styles.roomContainer}>
        <RoomCard />
      </div>
    </div>
  );
};

export default HomePage;
