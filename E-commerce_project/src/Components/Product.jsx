import React from 'react'
import Card from './Card'
import { useState,useEffect } from 'react'



function Product({addItem,items}) {
       
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