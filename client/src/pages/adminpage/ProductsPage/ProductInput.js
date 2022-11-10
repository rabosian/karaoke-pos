import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Alert,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const ProductInput = ({ categories, addProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("category");

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

  return (
    <Box sx={{ height: 400, width: "400px" }}>
      <Grid align="center">
        <Paper sx={{ padding: 7, width: 350 }}>
          <h4>add product</h4>
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
            onClick={add}
          >
            Add
          </Button>
        </Paper>
      </Grid>
    </Box>
  );
};

export default ProductInput;
