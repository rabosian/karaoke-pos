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
import AddIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../api";
import Sidebar from "../../../components/Sidebar";
import ProductInput from "./ProductInput";

// TO DO
// 1. useEffect가 products fetch
// 2. product add/update하면 페이지 업데이트(useEffect)
const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [msg, setMsg] = useState("");

  const convertNameId = (target) => {
    if (typeof target === 'string') {
      return categories.find((e) => e.name === target).id;
    } else {
      return categories.find((e) => e.id === target).name;
    }
  }

  const getData = async () => {
    try {
      let response = await api.get("/categories/allProducts");
      let data = response.data;
      let cat = [];
      let prod = [];
      data.map((item) => {
        cat.push({ id: item.id, name: item.name });
        let products = item.products;
        products.map((product) => {
          prod.push({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
          });
        });
      });
      setCategories(cat);
      setProducts(prod);
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let response = await api.delete(`/products/delete/${id}`);
      let data = response.data;
      setMsg("Product deleted successfully")
      getData()
    } catch (err) {
      console.log(err);
    }
  };

  const addProduct = async (name, price, stock, selectedCategory) => {
    let categoryId = convertNameId(selectedCategory)
    try {
      let response = await api.post("/products/create", {
        name,
        price,
        stock,
        categoryId
      });
      let data = response.data;
      getData()
      setMsg("Product added successfully");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (name, price, stock, selectedCategory) => {
    let categoryId = convertNameId(selectedCategory)

    try {
      setMsg("Product added successfully");
      setOpenModal(false);
      let response = await api.put(`/products/update/${selected}`, {
        name,
        price,
        stock,
        categoryId
      });
      console.log("update response: ", response)
      setMsg("Product updated successfully");
      setOpenModal(false);
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg("")
      }, 2000)
    }
  }, [msg]);

  const handleModelDelete = (e, cellValues) => {
    if (window.confirm("delete this product?")) {
      deleteProduct(cellValues.id);
    }
  };

  const handleModelEdit = (e, cellValues) => {
    setSelected(cellValues.id);
    setOpenModal(true);
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
    category: convertNameId(product.categoryId),
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
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {msg && (
          <Alert severity="success" sx={{ width: "500px" }}>
            {msg}
          </Alert>
        )}

        <IconButton
          onClick={() => {
            setOpenModal(true);
            setSelected(0);
          }}
        >
          <AddIcon fontSize="large" color="success" />
        </IconButton>
        <Box sx={{ height: "635px", width: "700px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ProductInput
            categories={categories}
            addProduct={addProduct}
            updateProduct={updateProduct}
            selected={selected}
          />
        </Modal>
      </Box>
    </Box>
  );
};

export default ProductsPage;
