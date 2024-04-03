import React,{useEffect,useState} from 'react'
import CartItems from '../Components/CartItems';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { commerce } from '../lib/Ecommerce';
import { addToCart } from '../store/CartSlice';




function Cart() {
  const[cartItem,setCartItem]=useState({})
    const dispatch=useDispatch()
    const fetchCart = async()=>{
        const carts = await commerce.cart.retrieve()
        .then((cartItem)=>
        {setCartItem(cartItem)
        dispatch(addToCart(cartItem))
      })
}
console.log(cartItem);
useEffect(() => {
  fetchCart()
}, [])

    // const cartItem = useSelector((state)=>state.cartItem.item)
    // console.log(cartItem);
    
   const isEmpty = !cartItem || cartItem.total_items === 0
    
    const EmptyCart = () => (
        <div className='w-full h-screen flex flex-wrap items-center justify-center '>
            <div className='text-center'>
                {isEmpty===0?<p className='font-bold mb-3  text-gray-700 dark:text-gray-400 '>Loading...
                </p>:<p className='font-bold '>you have no item in your shopping cart,  
                <Link to='/' className='text-red-600'> start shoping..</Link>
                </p>}
                {/* <p className='font-bold '>you have no item in your shopping cart, 
                <Link to='/' className='text-red-600'>start shoping..</Link>
                </p> */}
            </div>
        </div>
    )


    function FilledCart() {
      const dispatch = useDispatch()
        const cartItem = useSelector((state)=>state.cartItem.item)
      console.log(cartItem);
    const isEmpty = !cartItem || cartItem.total_items === 0

    const addItem = async(productId,quantity)=>{
            const item = await commerce.cart.add(productId,quantity)
            if(cartItem!==undefined){
                dispatch(addToCart(item.cartItem))
              }
            // setCartItem(item.cartItem)
        }
        const update = async(productId,quantity)=>{
          const item = await commerce.cart.update(productId,{quantity})
          .then((cartItem)=>dispatch(addToCart(cartItem)))
          // if(cartItem!==undefined){
          //   dispatch(addToCart(item.cartItem))
          // }
        //   setCartItem(item.cartItem)
        }
        const remove = async(productId)=>{
          const item = await commerce.cart.remove(productId)
          .then((cartItem)=>dispatch(addToCart(cartItem)))
          // if(cartItem!==undefined){
          //   dispatch(addToCart(item.cartItem))
          // }
        //   setCartItem(item.cartItem)
        }
        const empty = async()=>{
          const item = await commerce.cart.empty()
          .then((cartItem)=> dispatch(addToCart(cartItem)))
          // if(cartItem!==undefined){
          //   dispatch(addToCart(item.cartItem))
          // }
        //   setCartItem(item.cartItem)
        }
    
    console.log(cartItem);
        

        const valueItems = cartItem && Object.values(cartItem.line_items)
        return (
            <>
            <div className='grid justify-items-center grid-cols-1 md:grid-cols-4 '>
                {valueItems && valueItems.map((item, i) => (
                    <div key={i} >
                        <CartItems item={item} addItem={addItem} remove={remove} update={update} />
                    </div>
                ))}
                </div>
                <div className="p-5 flex flex-col md:flex md:flex-row md:justify-around items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Subtotal:- {cartItem && cartItem.subtotal.formatted_with_symbol}</h5>
                <div className=" rounded-3xl shadow-sm m-2 mx-1">
                    <button type="button" onClick={empty} className="px-4 py-2 m-1 rounded-lg text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                    EMPTY CART
                    </button>
                    <Link to='/checkout'>
                    <button type="button" className="px-4 py-2 m-1 rounded-lg text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                   CHECK OUT
                    </button>
                    </Link>
                </div>
                </div>
            
            </>
        )
    }

    return (
        <div>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </div>
    )
}

export default Cart