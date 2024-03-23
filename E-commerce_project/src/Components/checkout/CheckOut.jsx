import React, { useEffect, useState } from 'react'
import InputBox from '../Items/InputBox'
import SelectBar from '../Items/SelectBar'
import { Link } from 'react-router-dom'
import { commerce } from '../../lib/Ecommerce'
import { useForm } from 'react-hook-form'
import Address from './Address'
import Payment from './Payment'
import Conformation from './Conformation'

function CheckOut({ cart, order, handleCaptureCheckout, errorMessage }) {
    //const method = useForm()
    const [data, setData] = useState({})
    const [checkoutToken, setCheckOutToken] = useState(null)
    const steps = ["Address", "Payment", "Conformation"]
    const [currentState, setCurrentState] = useState(0)
    console.log(currentState);

    const nextStep = () => setCurrentState((prev) => prev + 1);
    const backtStep = () => setCurrentState((prev) => prev + 1);

    const Form = () => currentState === 0 ? <Address setData={setData} submit={submit} checkoutToken={checkoutToken} /> :
        <Payment setCurrentState={setCurrentState} nextStep={nextStep} checkoutToken={checkoutToken} data={data} handleCaptureCheckout={handleCaptureCheckout} />

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckOutToken(token)
            } catch (error) {
                console.log("error:-", error);
            }
        }
        generateToken()
    }, [])
    console.log(checkoutToken);

    const submit = (data) => {
        setData(data)
        nextStep();
    }

    const Conformation = () => {
        return (
            <>
                {order.id ? <>
                    <div className='flex flex-col items-center mt-10 '>
                        <h3>Your payment is complate and your product is shipped to your address that you mention</h3>
                        <h2 className='mt-2 font-bold'>Order Ref:- {order.customer_reference}</h2>
                        <div className='mt-3'><Link to="/"><button className=' bg-blue-500 rounded-xl p-2 '>Buy More..</button></Link></div>
                    </div>
                </>
                    : <>
                        <div >
                            <div className='flex flex-row items-center justify-center mt-10'>
                                <h3>Loding....</h3>
                                {/* <h4>Error:-{errorMessage}</h4> */}
                            </div>
                            {/* <div className='mt-3'><button className=' bg-blue-500'>Buy More..</button></div> */}
                        </div>
                    </>}
               
            </>
        )
    }


    return (
        <div className='flex flex-wrap justify-center m-3 '>
            <div className="max-w-sm p-6 bg-slate-300 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="p-5 flex flex-col items-center ">
                    <a href="#">
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">Check Out</h3>
                    </a>
                </div>
                <div className='flex justify-between'>
                    {steps?.map((step, i) => (
                        <div key={i} className={`step-item ${currentState < i && 'active'}`}>
                            <div className='step'>{i + 1}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
                {currentState === steps.length - 1 ? <Conformation errorMessage={errorMessage}/> : <Form setData={setData} setCurrentState={setCurrentState} />}
            </div>
        </div>
    )
}

export default CheckOut