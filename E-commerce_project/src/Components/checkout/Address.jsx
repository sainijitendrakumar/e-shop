import React,{useState,useEffect} from 'react'
import InputBox from '../Items/InputBox'
import SelectBar from '../Items/SelectBar'
import { commerce } from '../../lib/Ecommerce'
import { Link } from 'react-router-dom'
import { FormProvider,useForm } from 'react-hook-form'

function Address({checkoutToken,submit,setCurrentState }) {
    const methods = useForm()
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState("")
    const [shippingSubDivisions, setShippingSubDivisions] = useState([])
    const [shippingSubDivision, setShippingSubDivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption,setShippingOption]=useState('')

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    //console.log(countries);
    const subDivisions = Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name }))
    //console.log(subDivisions);

     useEffect(() => {
        try {
           fetchShippingCountries(checkoutToken && checkoutToken.id)
        } catch (error) {
            console.log("Error:-", error);
        }
    }, [checkoutToken])
    //console.log(checkoutToken.id);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListCountries(checkoutTokenId)
        // console.log(countries);
        setShippingCountries(countries)
        // setShippingCountries(Object.values(countries))
        setShippingCountry(Object.keys(countries)[0])
    }
    //console.log(shippingCountries);

    useEffect(() => {
        try {
            if (shippingCountry) fetchShippingSubdivisions(shippingCountry)

        } catch (error) {
            console.log("Error:-", error);
        }
    }, [shippingCountry])
    // console.log(shippingCountry);
    // console.log(shippingSubDivision);
    

    useEffect(() => {
        try {
            if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
        } catch (error) {
            console.log("Error:-", error);
        }
    }, [shippingSubDivision])

    const fetchShippingSubdivisions = async (shippingCountry) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(shippingCountry)
        // console.log(subdivisions);
        setShippingSubDivisions(subdivisions);
        
    }
    const fetchShippingOptions = async (checkoutTokenId,country,region="0" ) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId,{country,region});
        console.log(options);
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }
    // console.log(shippingOptions);
  return (
    <FormProvider {...methods}>
    <form className="max-w-md mx-auto" onSubmit={methods.handleSubmit((data)=>submit({...data,shippingCountry,shippingSubDivision,shippingOption}))}>
                    <div className="p-3 flex flex-col items-start ">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white ">Shipping Address</h5>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputBox name={'first_name'} id={'first_name'} label={"First Name"} register={methods.register('first_name')}/>
                        <InputBox name={'last_name'} id={'last_name'} label={"Last Name"} register={methods.register('last_name')}/>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputBox name={'address'} id={'address'} label={"Address"} register={methods.register('address')}/>
                        <InputBox name={'email'} id={'email'} type={'email'} label={"Email"} register={methods.register('email')} />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <InputBox name={'city'} id={'city'} label={"City"} register={methods.register('city')} />
                        <InputBox name={'zipcode'} id={'zipcode'} label={"Zip Code"} register={methods.register('zipcode')}/>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-1 group">
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Countries </label>
                            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setShippingCountry(e.target.value)}>
                                {countries !== 0 && countries.map((countries) => (
                                    <option key={countries.key} value={countries.id}>{countries.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative z-0 w-full mb-1 group">
                            <label htmlFor="subdivisions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Sub-Divisions </label>
                            <select id="subdivisions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               onChange={e => setShippingSubDivision(e.target.value)}>
                                {subDivisions !== 0 && subDivisions.map((subdivision) => (
                                    <option key={subdivision.id} value={subdivision.id}>{subdivision.label}</option>
                                ))}
                            </select>
                        </div>
                         <div className="relative z-0 w-full mb-1 group">
                            <label htmlFor="subdivisions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shipping Sub-Divisions </label>
                            <select id="subdivisions" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               onChange={e => setShippingOptions(e.target.value)}>
                                {shippingOptions !== 0 && shippingOptions.map((sO)=>({id:sO.id,label:`${sO.description} - ${sO.price.formatted_with_symbol}`})).map((subOption)=> (
                                    <option key={subOption.id} value={subOption.id}>{subOption.label}</option>
                                ))}
                            </select>
                        </div>
                        {/* <SelectBar name={"Shipping-Options"} /> */}
                    </div>
                    <div className='md:flex md:flex-row md:justify-between'>
                        <div className='mt-5'>
                            <Link to='/cart'><button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cart Items</button></Link>
                        </div>
                        <div className='mt-5'>
                            <button type="submit"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Step</button>
                        </div>
                    </div>
                </form>
                </FormProvider>
  )
}

export default Address