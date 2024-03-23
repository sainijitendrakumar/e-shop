import React from 'react'
import Review from './Review'
import "../../App.css"
import { CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function Payment({ checkoutToken, setCurrentState, data, nextStep, handleCaptureCheckout }) {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)


    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();

        if (!elements || !stripe) return;

        const cardElements = elements.getElement(CardElement)
        //console.log(cardElements);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElements })
        console.log(paymentMethod);

        if (error) {
            console.log(error);
        } else {
            const orderData = {
                line_items: checkoutToken.line_items,
                customer: { firstname: data.first_name, lastname: data.last_name, email: data.email },
                shipping: {
                    name: "Primary",
                    street: data.address,
                    town_city: data.city,
                    state: data.shippingSubDivision,
                    postel_zipcode: data.zipcode,
                    country: data.shippingCountry,
                },
                billing: {
                    name: "Primary",
                    street: data.address,
                    town_city: data.city,
                    state: data.shippingSubDivision,
                    postel_zipcode: data.zipcode,
                    country: data.shippingCountry,
                },
                 fulfillment:{shipping_method:data.shippingOption},
                payment: {
                    gateway: 'test_gateway',
                    card: {
                        number: '4242424242424242',
                        expiry_month: '04',
                        expiry_year: '24',
                        cvc: '242',
                        postal_zip_code: '42424',
                      },
               }
            }
            console.log(orderData);
            handleCaptureCheckout(checkoutToken.id, orderData)
            nextStep()
        }
    }



   // console.log(checkoutToken);

    return (
        <>
            <div className="p-3 flex flex-col items-start ">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">Paymant Form</h5>
            </div>
            <Review checkoutToken={checkoutToken} />
            <div className="p-3 flex flex-col items-start ">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">Paymant</h5>
            </div>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                            <CardElement />
                            <br /><br />
                            <div className='flex justify-between'>
                                <button type="button" onClick={() => setCurrentState((prev) => prev - 1)} className="btn bg-slate-500">back</button>
                                <button type="submit" className="btn bg-slate-500">pay</button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>

        </>
    )
}

export default Payment