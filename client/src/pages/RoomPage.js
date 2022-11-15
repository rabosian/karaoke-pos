import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";

import Menu from '../components/Menu/Menu'
import Ticket from '../components/Ticket/Ticket'

import RoomCard from '../components/RoomCard/RoomCard'

// styled.button`
// //  <button> HTML 엘리먼트에 대한 스타일 정의
// `;

// const styledButton = styled(Button)`
// //  <Button> React 컴포넌트에 스타일 정의
// `;

const ContainerStyled = styled.div`
  width: 90%;
  margin: auto;
  height: 80vh;
  position: relative;
  border: 1px solid #003458;
  background: lightgrey;
  overflow: hidden;
`

const TicketStyled = styled.div`
  width: 45%;
  height: inherit;
  float: left;
  position: absolute;
  box-sizing: border-box;
  background-color: #8977ad;
`;

const MenuStyled = styled.div`
  width: 55%;
  height: inherit;
  float: right;
  box-sizing: border-box;
  background-color: #ece6cc;
  
`

const RoomPage = () => {
  const [ticketProducts, setTicketProducts] = useState([])
  const { roomId } = useParams();


  const addProducts = (item) => {        
    setTicketProducts(      
      [...ticketProducts, item]
      );        
      console.log(item)
  }  
  
  const removeProduct = (item) => {            
    const newArr = ticketProducts;    
    newArr.splice(newArr.findIndex(a => a.name === item.name), 1);    
    setTicketProducts([...newArr]);    
  }

  return (
    <div>
      <h3>{roomId}번 방 이라구..!</h3>
      <ContainerStyled>

        <TicketStyled>ticket
          <Ticket products={ticketProducts} remove={removeProduct}/>
        </TicketStyled>

        <MenuStyled>menu
          <Menu addProducts={addProducts} />
        </MenuStyled>

      </ContainerStyled>
    </div>
  );
}

export default RoomPage;