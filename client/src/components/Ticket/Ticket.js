import React, { useState, useEffect } from 'react';
import styled from "styled-components";

const TicketStyled = styled.div`
  width: 90%;
  background-color: #FFF;
  height: 85vh;
  padding: 10px;    
  margin: auto;
  border-radius: 10px;   
`

const RemoveStyled = styled.td`
  pointer: cursor;
`
const Ticket = ({products, remove}) => {
  
  let total = products.reduce((prev, curr) => prev + curr[1], 0)

  const handleDeleteProduct = (product) => {
    remove(product)
  }

  return (
    <TicketStyled>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product, id) => (
            <tr key={id}>
              <td>{product[0]}</td>
              <td>1</td>
              <td>{product[1]}</td>
              <RemoveStyled onClick={() => handleDeleteProduct(product)}>❌</RemoveStyled>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <hr/>
        <div>
          Subtotal: ${total}
        </div>
        <hr/>
      </div>

    </TicketStyled>
  );
};

export default Ticket;