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
import Sidebar from "../../components/Sidebar";

// TO DO
// 1. RoomCard render할 때마다 Order info data fetch (useEffect, setTimeout)
// - isKorean, customer_num, date, total
// 2. isActive == true인 room은 다른색으로 표시
// 3. update time every minute
const HomePage = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className={styles.screen}>
      <Sidebar />
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
