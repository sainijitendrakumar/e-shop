import React from 'react'

function CartItems({ item,remove,update }) {
    
    return (
        <div className='flex flex-wrap justify-center m-3 '>
            <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <div className="p-4 ">
                    <div className="p-5 flex flex-col md:flex-row justify-between items-center ">
                    <a href="#">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">{item.name}</h5>
                    </a>
                    <p className="font-bold text-xl justify-between mb-2">{item.line_total.formatted_with_symbol}</p>
                    </div>
                    <a href="#">
                        <img className="rounded-t-lg h-64" src={item.image?.url} alt="" />
                    </a>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-900 my-2">
                        <div className="inline-flex rounded-3xl shadow-sm mx-1" role="group">
                            <button  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            onClick={()=>update(item.id,item.quantity - 1)}>
                                -
                            </button>
                            <button disabled className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900   focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                               {item.quantity}
                            </button>
                            <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                            onClick={()=>update(item.id,item.quantity + 1)}>
                               +
                            </button>
                        </div>
                        <div className="inline-flex rounded-3xl shadow-sm m-2 mx-1">
                        <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        onClick={()=>remove(item.id)}>
                               Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems