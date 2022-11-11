import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Alert,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import api from "../../../api";

const ProductInput = ({ categories, addProduct, selected, updateProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("category");

  const getProductById = async () => {
    try {
      let response = await api.get(`/products/${selected}`)
      let data = response.data
      let idToName = categories.find((e) => e.id === data.categoryId).name
      setName(data.name)
      setPrice(data.price)
      setStock(data.stock)
      setSelectedCategory(idToName)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selected > 0) {
      getProductById()
    }
  }, [])

  const add = () => {
    if (
      name === "" ||
      price === "" ||
      stock === "" ||
      selectedCategory === ""
    ) {
      setError("fill cannot be empty");
      return;
    } else {
      addProduct(name, price, stock, selectedCategory);
      setName("");
      setPrice("");
      setStock("");
      setSelectedCategory("");
    }
  };

  const update = () => {
    if (
      name === "" ||
      price === "" ||
      stock === "" ||
      selectedCategory === ""
    ) {
      setError("fill cannot be empty");
      return;
    } else {
      updateProduct(name, price, stock, selectedCategory);
      setName("");
      setPrice("");
      setStock("");
      setSelectedCategory("");
    }
  };

  return (
    <Box sx={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Grid align="center">
        <Paper sx={{ padding: 7, width: 350 }}>
          <h4>{selected > 0 ? 'Update Product' : 'Add Product'}</h4>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            required
            variant="standard"
            fullWidth
            size="small"
            value={name}
            label="Product name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            variant="standard"
            fullWidth
            size="small"
            value={price}
            label="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            required
            variant="standard"
            fullWidth
            size="small"
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
            onClick={selected > 0 ? update : add}
          >
            {selected > 0 ? 'Update' : 'Add'}
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
};

export default ProductInput;
