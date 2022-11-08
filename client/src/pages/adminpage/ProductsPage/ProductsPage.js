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
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("category");

  const getCategories = async () => {
    try {
      let response = await api.get("/categories");
      let data = response.data;
      let arr = [];
      data.map((item) => {
        arr.push({ id: item.id, name: item.name });
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
        arr.push(
          createData(item.categoryId, item.name, item.price, item.stock)
        );
      });
      setProducts(arr);
    } catch (err) {
      console.log("error", err);
    }
  };

  const addProduct = async () => {
    let nameToId = categories.find((e) => e.name === selectedCategory);
    try {
      let response = await api.post("/products/create", {
        name,
        price,
        stock,
        categoryId: nameToId.id,
      });
      let data = response.data;
      let col = createData(data.categoryId, data.name, data.price, data.stock);
      setProducts([...products, col]);
      setName("");
      setPrice("");
      setStock("");
      setSelectedCategory("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  function createData(category, name, price, stock) {
    return { category, name, price, stock };
  }

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
                {products.map((row) => {
                  let idToName = categories.find((e) => e.id === row.category);
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{idToName.name}</TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
        <div className={styles.right}>
          <Grid align="center">
            <h4>add product</h4>
            <Paper sx={{ padding: 7, width: 350 }}>
              <TextField
                required
                variant="standard"
                fullWidth
                value={name}
                label="Product name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                variant="standard"
                fullWidth
                value={price}
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                required
                variant="standard"
                fullWidth
                value={stock}
                label="Stock"
                onChange={(e) => setStock(e.target.value)}
              />
              <Select
                size="small"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{ mt: 2, width: "100px" }}
              >
                {categories &&
                  categories?.map((item) => {
                    return (
                      <MenuItem key={item.id} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <Button
                variant="contained"
                sx={{ mt: 2, display: "block" }}
                style={{ backgroundColor: "#11262f" }}
                onClick={addProduct}
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
