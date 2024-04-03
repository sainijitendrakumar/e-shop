import React from 'react'
import Card from '../Components/Card'
import { useState,useEffect } from 'react'
import { commerce } from '../lib/Ecommerce'



function Product({addItem}) {
  const[items,setItems]=useState([])

  const fetchData = async()=>{
    const product = await commerce.products.list() 
    setItems(product.data) 
}
       useEffect(() => {
        fetchData()
       }, [])
       
  return (
   <>
   <div className='grid justify-items-center grid-cols-1 md:grid-cols-4'>
   {items.map((item,i)=>(
    <div key={i} >
        <Card item={item} addItem={addItem}/>
    </div>
   ))}
   </div>
   </>
  )
}

export default Product