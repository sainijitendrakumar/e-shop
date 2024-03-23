import React from 'react'
import { Link } from 'react-router-dom'
import Stepper from '../Stapper/Stepper'

function CheckOutNextStep() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center' >
        <Stepper />
    </div>
  )
}

export default CheckOutNextStep