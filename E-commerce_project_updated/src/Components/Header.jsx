import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { commerce } from '../lib/Ecommerce'
import { useDispatch,useSelector } from 'react-redux'
import { addToCart } from '../store/CartSlice'


function Header() {
//     const[cartItem,setCartItem]=useState({})
//     const dispatch=useDispatch()
//     const fetchCart = async()=>{
//         const carts = await commerce.cart.retrieve()
//         .then((cartItem)=>
//         {setCartItem(cartItem)
//         dispatch(addToCart(cartItem))
//       } )
// }
    // const data = useSelector((state)=>state.cartItem.item)
    //     console.log(data);

// useEffect(() => {
//   fetchCart()
// }, [])
const cartItem = useSelector((state)=>state.cartItem.item)
// console.log(cartItem);
    
    return (
        <nav className="bg-slate-300 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="logoImg.png" className="h-24 rounded-xl" alt="Flowbite Logo" />
                    <span className=" text-xl text-blue-500 font-semibold dark:text-white">Online Shop</span>
                </a>
                <div className="justify-between w-1/3 md:block md:w-auto" id="navbar-multi-level">
                    <div className=" flex justify-center items-center">
                        <Link to='/cart'>
                        <div className="relative py-2">
                            <div className="t-0 absolute left-3">
                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cartItem?cartItem.total_items:0}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Header
