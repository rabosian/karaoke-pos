import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./ProductsPage.module.css";
import api from "../../../api";

// TO DO
// 1. useEffect가 products fetch
// 2. product add/update하면 페이지 업데이트(useEffect)
const ProductsPage = () => {
  // from api
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("category");

  const getCategories = async () => {
    try {
      let response = await api.get("/categories");
      let data = response.data;
      let arr = [];
      data.map((item) => {
        arr.push([item.id, item.name]);
      });
      setCategories(arr);
    } catch (err) {
      console.log("error", err);
    }
  };

  const getProducts = async () => {
    try {
      let response = await api.get("/products");
      let data = response.data;
      let arr = [];
      data.map((item) => {
        arr.push([item.id, item.name]);
      });
      setProducts(arr);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getCategories();
    // getProducts();
  }, []);

  function createData(category, name, price, stock) {
    return { category, name, price, stock };
  }
  const rows = [
    createData("Food", "ice cream", 5.0, 30),
    createData("Drink", "soju", 21.99, 30),
    createData("Service", "1 hour", 25.0, 1),
    createData("Service", "30 mins", 13.0, 1),
    createData("Service", "add guest", 10.0, 1),
  ];

  return (
    <div>
      <h1>Manage Products</h1>
      <div className={styles.screen}>
        <div className={styles.left}>
          <h4>Products</h4>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "beige" }}>
                  <TableCell align="right">category</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.stock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className={styles.right}>
          <Grid align="center">
            <h4>add product</h4>
            <Paper sx={{ padding: 7, width: 450 }}>
              <TextField
                required
                variant="standard"
                type="text"
                fullWidth
                label="Product name"
              />
              <TextField
                required
                variant="standard"
                type="password"
                fullWidth
                label="Price"
              />
              <TextField
                required
                variant="standard"
                type="password"
                fullWidth
                label="Stock"
              />
              <Select
                size="small"
                value={selectedCategory}
                onChange={(e)=>setSelectedCategory(e.target.value)}
                sx={{ width: "200px" }}
              >
                {categories &&
                  categories?.map((item) => {
                    return (
                      <MenuItem key={item[0]} value={item[1]}>
                        {item[1]}
                      </MenuItem>
                    );
                  })}
              </Select>
              <Button
                variant="contained"
                sx={{ mt: 4 }}
                style={{ backgroundColor: "#11262f" }}
              >
                Add
              </Button>
            </Paper>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
