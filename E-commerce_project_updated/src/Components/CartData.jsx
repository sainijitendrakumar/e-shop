import React, { useState,useEffect } from 'react'
import { commerce } from '../lib/Ecommerce'
import { useDispatch } from 'react-redux'



function CartData() {
    const[cartItem,setCartItem]=useState()
    const dispatch=useDispatch()
    const fetchCart = async()=>{
        const carts = await commerce.cart.retrieve()
        .then((cartItem)=>
        {setCartItem(cartItem)
        dispatch(addToCart(cartItem))
      })
}
useEffect(() => {
  fetchCart()
}, [])

  return 
}

export default CartData