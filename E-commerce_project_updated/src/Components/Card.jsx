import React from 'react'
import { commerce } from '../lib/Ecommerce'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../store/CartSlice'




function Card({ item }) {
  const dispatch = useDispatch()
  const cartItem = useSelector((state)=>state.cartItem.item)
  // console.log(cartItem);
  const addItem = async(productId,quantity)=>{
    const item = await commerce.cart.add(productId,quantity).then((cartItem)=>dispatch(addToCart(cartItem)))
    // 
    // setCartItem(item.cartItem)
}
    
  return (
    <div className='flex flex-wrap justify-center m-4 '>
      <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description.replace(/(<([^>]+)>)/ig, '')}</p>
          <a href="#">
            <img className="rounded-t-lg h-64" src={item.image?.url} alt="" />
          </a>
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-900">
            <p className="font-bold text-xl">{item.price.formatted_with_symbol}</p>
            <button
              className="px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-gray-800 hover:text-white border-2 border-gray-900 focus:outline-none m-2" onClick={()=>addItem(item.id,1)}>Add
              to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card