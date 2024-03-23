import { commerce } from './lib/Ecommerce'
import Product from './Components/Product'
import Cart from './Components/Cart'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './Components/Header'
import { useState,useEffect } from 'react'
import CheckOut from './Components/checkout/CheckOut'
import CheckOutNextStep from './Components/checkout/CheckOutNextStep'
import Stepper from './Components/Stapper/Stepper'


function App() {
  // const commerce = new Commerce(import.meta.env.VITE_PUBLIC_KEY)
  const[cartItem,setCartItem] = useState()
  const[items,setItems]=useState([])
  const[order,setOrder]=useState({})
  const[errorMessage,setErrorMessage]=useState('')

  const fetchData = async()=>{
    const product = await commerce.products.list() 
    setItems(product.data) 
}

  const fetchCart = async()=>{
    setCartItem(await commerce.cart.retrieve())
}
const addItem = async(productId,quantity)=>{
    const item = await commerce.cart.add(productId,quantity)
    setCartItem(item.cartItem)
}
const updateItem = async(productId,quantity)=>{
  const item = await commerce.cart.update(productId,{quantity})
  setCartItem(item.cartItem)
}
const removeItem = async(productId)=>{
  const item = await commerce.cart.remove(productId)
  setCartItem(item.cartItem)
}
const emptyCart = async()=>{
  const item = await commerce.cart.empty()
  setCartItem(item.cartItem)
}
useEffect(()=>{
  fetchCart()
  fetchData()
},[])
//console.log(cartItem);
const handleCaptureCheckout = async(checkoutTokenId,newOrder)=>{
  try {
    const incomingOrder = await commerce.checkout.capture(checkoutTokenId,newOrder)
    setOrder(incomingOrder);
    refreshCart();
  } catch (error) {
    setErrorMessage("Error:-",error.data.error.message);
  }
}
const refreshCart = async()=>{
  const newCart = commerce.cart.refresh();
  setItems(newCart);
}
console.log(order);
  return (
    <>
      <Router>
        <Header cartItem={cartItem?cartItem.total_items:0}/>
        <Routes>
          <Route exact path='/cart' element={<Cart cartItem={cartItem} addItem={addItem} remove={removeItem} update={updateItem} empty={emptyCart}/>}></Route>
          <Route exact path='/' element={<Product addItem={addItem} items={items}/>}></Route>
          <Route exact path='/checkout' element={<CheckOut  cart={cartItem} order={order} handleCaptureCheckout={handleCaptureCheckout} errorMessage={errorMessage}/>}></Route>
          <Route exact path='/checkoutnextstep' element={<CheckOutNextStep />}></Route>
          <Route exact path='/stapper' element={<Stepper />}></Route>
          
        </Routes>
      </Router>
      
     
    </>
  )
}

export default App
