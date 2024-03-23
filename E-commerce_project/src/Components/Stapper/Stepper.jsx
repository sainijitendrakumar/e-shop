import React, { useState } from 'react'
import "./Stepper.css"


const Stepper =()=> {
  const steps = ["shipping info","payment info"]
  const[currentState,setCurrentState]=useState(1)
  const[complate,setComplate]=useState(false)
  return (
    <>
    <div className='mb-5'>
      <h3 className='font-bold '>
        Check Out
      </h3>
    </div>
    <div className='flex justify-between'>
      {steps?.map((step,i)=>(
        <div key={i} className={`step-item ${currentState===i+1 && "active"} ${i+1 <= currentState && 'complate'}`}>
          <div className='step'>{i + 1}</div>
          <p className='text-gray-500'>{step}</p>
        </div>
      ))}
    </div>
    
    <div className='flex flex-row justify-between mt-4'>
    <button type="button"  onClick={()=>currentState==0?setComplate(true):setCurrentState((prev)=>prev-1)} className="btn bg-slate-500 mx-5">Privious</button>
    <button type="button" onClick={()=>currentState==steps.length?setComplate(true):setCurrentState((prev)=>prev+1)} className="btn bg-slate-500 mx-5">{currentState===steps.length?"Finish":"Next"}</button>
    </div>
    </>
  )
}

export default Stepper