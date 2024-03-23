import React,{useEffect} from 'react'
import CartItems from './CartItems';
import { Link } from 'react-router-dom';

function Cart({ cartItem,addItem,remove,update,empty }) {
    const isEmpty = !cartItem || cartItem.total_items === 0
    
    console.log(cartItem);
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


    function FilledCart({ cartItem, addItem, remove,update,empty }) {
        //TODO:- Loading...
        //    const loading = !cartItem && cartItem.total_items !== 0
        //    if(loading){
        //     return <p>Loading...</p>
        //    }

        const valueItems = Object.values(cartItem.line_items)
        return (
            <>
            <div className='grid justify-items-center grid-cols-1 md:grid-cols-4 '>
                {valueItems.map((item, i) => (
                    <div key={i} >
                        <CartItems item={item} addItem={addItem} remove={remove} update={update} />
                    </div>
                ))}
                </div>
                <div className="p-5 flex flex-col md:flex md:flex-row md:justify-around items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Subtotal:- {cartItem.subtotal.formatted_with_symbol}</h5>
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
            {isEmpty ? <EmptyCart /> : <FilledCart cartItem={cartItem} addItem={addItem} remove={remove} update={update} empty={empty}/>}
        </div>
    )
}

export default Cart