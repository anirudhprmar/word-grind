import React from 'react'
import {Check} from 'lucide-react'
import { Button } from './ui/button'

function Pricing() {
  return (
     <section className="flex flex-col items-center justify-center gap-5  min-h-screen">
      <div>
        <h4 className="font-bold text-3xl">Choose your Learning journey </h4>
      </div>

        <div className='flex  gap-10 items-center justify-center flex-wrap  p-5'>
            <div className='bg-[#CFDDC0] p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-120'>
                <div className='flex flex-col items-center '>
                    <p className='font-bold text-lg'>Standard</p>
                    <p className='font-sm'>For serious vocabulary builders</p>
                </div>
                <div className='flex gap-2 items-baseline'>
                    <p className='font-bold text-3xl flex gap-1 items-center'><span>$</span>9.99</p>
                    <span className='text-md'>usd</span>
                </div>
                <div>
                    <ul className='flex flex-col gap-2 '>
                        <li className='font-semibold text-lg flex gap-1 items-center '><Check/>Practice Sessions </li>
                        <li className='font-semibold text-lg flex gap-1 items-center '><Check/>Progress tracking</li>
                        <li className='font-semibold text-lg flex gap-1 items-center '><Check/>20 new words per month</li>
                    </ul>

                </div>

                <div className='flex flex-col items-center justify-center gap-2'>
                    <Button variant={'default'}  size={'lg'} className='bg-gray-50 text-black p-2 text-xl  rounded-lg cursor-pointer'>Get Vocab</Button>
                    <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
                </div>
            </div>
            <div className='bg-[#B1D38D] p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-120'>
                <div className='flex flex-col items-center '>
                    <p className='font-bold text-lg'>Pro</p>
                    <p className='font-sm'>Best value for lifelong learners</p>
                </div>
                <div className='flex gap-2 items-baseline'>
                    <p className='font-bold text-3xl flex gap-1 items-center'><span>$</span>19.99</p>
                    <span className='text-md'>usd</span>
                </div>
                <div>
                    <ul className='flex flex-col gap-2'>
                        <li className='font-semibold text-lg flex gap-1 items-center'><Check/> All features + AI insights </li>
                        <li className='font-semibold text-lg flex gap-1 items-center'><Check/>real world examples</li>
                        <li className='font-semibold text-lg flex gap-1 items-center'><Check/>community</li>
                    </ul>

                </div>

                <div className='flex flex-col items-center justify-center gap-2'>
                    <Button variant={'default'} size={'lg'} className='bg-[#415926] text-white p-2 text-xl rounded-lg cursor-pointer'>Get Vocab</Button>
                    <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default Pricing
