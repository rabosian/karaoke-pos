import React, { useEffect, useState } from "react";
import api from "../../api";
import styled from "styled-components";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const ContainerStyled = styled.div`
  width: 120;
  height: 120px;
  box-sizing: 0;
  flex-direction: row;
  flex-wrap: wrap;
  display:inline-block;
  margin: 10px;
  &:hover {
    background-color: lightgrey
    margin: 0;
`
const ButtonStyled = styled(Button)`
  display:inline-block;
  text-align: center;
  margin: 0;
`


const Menu = ({ addProducts }) => {
  const [ categoryId, setCategoryId ] = useState(3);
  const [ categories, setCategories ] = useState([])
  const [ products, setProducts ] = useState([]);


  const clickHandler = (product) => {
    addProducts(product);
  };

  const handleChange = (event, newValue) => {
    setCategoryId(newValue);
  };

  const categoryFetch = async () => {
    try {
      const res = await api.get(`/categories`)
      const data = res.data;
      const arr = []
      data.map((item) => {
        arr.push([item.name, item.id])
      })
      setCategories(arr)
      console.log(arr)
    } catch (error) {
      console.log(error)
    }
  }

  const productFetch = async () => {
    const res = await api.get(`/categories/${categoryId}`);
    const data = res.data;
    const arr = [];
    data.products.map((item) => {
      arr.push([item.name, item.price]);
    });
    setProducts(arr);
  };


  useEffect(() => {
    productFetch();
    categoryFetch();
  }, []);


  useEffect(() => {
    productFetch();
  }, [categoryId]);


  return (
    <div>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={categoryId-1} onChange={handleChange} centered>
        {categories?.map((category) => {
          return (
            <Tab label={category[0]} onClick={() => {setCategoryId(category[1])}}  />
          )
      })}
        </Tabs>
      </Box>
      {products.map((product) => {
          return (
            <ContainerStyled>
              <ButtonStyled variant="outlined" size="large" onClick={() => clickHandler(product)}>
                <p>{product[0]}<br />$ {product[1]}</p>
              </ButtonStyled>
            </ContainerStyled>
          );
        })}
    </div>
  );
};

export default Menu;
