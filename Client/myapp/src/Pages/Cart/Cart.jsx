// CartPage.js

import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import {useSelector,useDispatch} from 'react-redux';
import { getCartData } from '../../Redux/cartReducer/action';
import Shopping from '../Shopping';
import { Box, Button, Heading, Table, TableContainer, Tbody, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import Crousel from '../../Components/Crousel';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data} = useSelector((store)=>{
    return store.cartReducer
  });
  // const inputFile = useRef(null);
  // const openFile = ()=>{
  //   inputFile.current.click();
  // }
  console.log(data.cart);

  let length = data.cart?.length;
  let totalCost=data.cart?.map((ele)=>(ele.price)).reduce((acc,i)=>acc+i,0);
    console.log(totalCost);

  useEffect(()=>{
    dispatch(getCartData())
  },[])
  return (
    <>
    {/* <div>
      <input type="file" id="file" ref={inputFile} style={{display:'none'}} />
      <button onClick={()=>openFile()} style={{color:'black'}}>OPen file</button>
    </div> */}


        <Box marginBottom={"30px"}>
          <Crousel/>
        </Box>

    <div className="cart-page">
      <Heading textAlign={"left"}>Shopping Cart <span style={{color:'red'}}>{` (${length} Items)`}</span> </Heading>
      
     

<Box width={"90%"} margin="auto">

<TableContainer>
  <Table
    bgColor={'rgb(250, 247, 247)'}
    padding={"20px"}
    border={"1px solid grey"}
    height={"auto"}
    marginTop={"20px"} alignItems={'center'} textAlign={'center'}
    >
    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead  mb={'20px'} border={'2px solid black'}  alignItems={'center'} textAlign={'center'}>
      <Tr alignItems={'center'} textAlign={'center'}>
        <Th p={'9'} fontSize={'xl'} fontWeight={'extrabold'}>Product</Th>
        <Th fontSize={'xl'} fontWeight={'extrabold'}>Basic Price</Th>
        <Th fontSize={'xl'} fontWeight={'extrabold'}>Total Price</Th>
        <Th fontSize={'xl'} fontWeight={'extrabold'}> Quanity</Th>
        <Th fontSize={'xl'} fontWeight={'extrabold'}> G Total</Th>
        
      </Tr>
    </Thead>
     <Tbody>
      
    {
      data.cart?.map((ele)=>{
        return(
          <Shopping key={ele._id} {...ele} />
          )
        })
      }
    </Tbody>
    <Tfoot>
      {/* <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr> */}
    </Tfoot>
  </Table>
</TableContainer>
</Box>

    </div>
    <Heading textAlign={'right'} mr={'10%'} size={'lg'}>Total Price = {totalCost}</Heading>
    <Box
    alignItem={"right"}
    justifyContent={"right"}
    width={"40%"}
    margin={"auto"}
    bgColor={"green"}
    borderRadius={"20px"}
    marginTop={"30px"}
    >
          <Button
            padding={"20px"}
            bgColor={"green"}
            width={"100%"}
            borderRadius={"20px"}
            onClick={()=>{
              navigate('/checkout')
              localStorage.setItem('total',totalCost);
            }}
            >
            Proceed to pay
          </Button>
        </Box>

  </>
  );
};


export default Cart;
