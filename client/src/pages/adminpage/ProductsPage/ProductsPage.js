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
  IconButton,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Sidebar from "../../../components/Sidebar";
import ProductInput from "./ProductInput";

// TO DO
// 1. useEffect가 products fetch
// 2. product add/update하면 페이지 업데이트(useEffect)
const ProductsPage = () => {
  // from api
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

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
        let idToName = categories.find((e) => e.id === item.categoryId).name;
        arr.push({
          id: item.id,
          category: idToName,
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

  const deleteProduct = async (id) => {
    try {
      let response = await api.delete(`/products/delete/${id}`);
      let data = response.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (name, price, stock, selectedCategory) => {

    let nameToId = categories.find((e) => e.name === selectedCategory);
    try {
      let response = await api.post("/products/create", {
        name,
        price,
        stock,
        categoryId: nameToId.id,
      });
      let data = response.data;
      let idToName = categories.find((e) => e.id === data.categoryId);
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
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (id) => {

  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const handleModelDelete = (e, cellValues) => {
    console.log("delete cellValues: ", cellValues.id);
    if (window.confirm("delete this product?")) {
      deleteProduct(cellValues.id);
      alert("delete success");
      getProducts();
    }
  };

  const handleModelEdit = (e, cellValues) => {
    console.log("edit cellValues: ", cellValues);
    updateProduct(cellValues.id);
  };

  const columns = [
    { field: "category", headerName: "Category", width: 120 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "stock", headerName: "Stock", width: 80 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              onClick={(e) => {
                handleModelDelete(e, cellValues);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                handleModelEdit(e, cellValues);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
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
      <Box sx={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <Box sx={{ height: "635px", width: "700px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <ProductInput categories={categories} addProduct={addProduct} />
      </Box>
    </Box>
  );
};

export default ProductsPage;
