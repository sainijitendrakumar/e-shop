import React from 'react'

function Review({ checkoutToken }) {
    console.log(checkoutToken);
    return (
        <>
            {checkoutToken && checkoutToken.line_items.map((product) => (
                <div key={product.id}  >
                    <div className='flex flex-row justify-between'>
                        <p className='mx-5'>{product.name}</p>
                        <p>{product.price.formatted_with_symbol}</p>

                    </div>

                </div>

            ))}
            <div className='mt-3 mx-3'>
                <p className='font-bold'>Total</p>
                 <p>{checkoutToken && checkoutToken.total.formatted_with_symbol}</p> 
            </div>
        </>
    )
}

export default Review