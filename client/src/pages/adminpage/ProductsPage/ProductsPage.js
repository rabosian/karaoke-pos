import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Alert,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Sidebar from "../../../components/Sidebar";

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
  const [error, setError] = useState("");

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
        let idToName = categories.find((e) => e.id === item.categoryId)
        arr.push({
          id: item.id,
          category: idToName.name,
          name: item.name,
          price: item.price,
          stock: item.stock,
        });
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
      let idToName = categories.find((e) => e.id === data.categoryId)
      setProducts((prev) => [
        ...prev,
        {
          id: data.id,
          category: idToName.name,
          name: data.name,
          price: data.price,
          stock: data.stock,
        },
      ]);
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

  const columns = [
    { field: "category", headerName: "Category", width: 120 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "stock", headerName: "Stock", width: 80 },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    category: product.category,
    name: product.name,
    price: product.price,
    stock: product.stock,
  }));

  return (
    <Box>
      <Sidebar />
      <Typography variant="h3" sx={{ textAlign: "center", my: 3 }}>
        Manage Products
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ height: 700, width: "550px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <Box sx={{ height: 400, width: "50%" }}>
          <Grid align="center">
            <h4>add product</h4>
            <Paper sx={{ padding: 7, width: 350 }}>
              {error && <Alert severity="error">{error}</Alert>}
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
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsPage;
