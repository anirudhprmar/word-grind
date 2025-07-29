import React from 'react'

function Pricing() {
  return (
     <section className="flex flex-col items-center justify-around gap-5  bg-gray-100 min-h-screen">
      <div>
        <h4 className="font-bold text-3xl">Choose your Learning journey </h4>
      </div>

        <div className='flex  gap-10 items-center justify-center flex-wrap  p-5'>
            <div className='bg-[#CFDDC0] p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-106'>
                <div className='flex flex-col items-center '>
                    <p className='font-bold text-lg'>Standard</p>
                    <p className='font-sm'>For serious vocabulary builders</p>
                </div>
                <div className='flex gap-2 items-baseline'>
                    <p className='font-bold text-3xl'>$9.99</p>
                    <span className='text-md'>usd</span>
                </div>
                <div>
                    <ul className='flex flex-col gap-2'>
                        <li className='font-semibold text-md'> Smart Reading</li>
                        <li className='font-semibold text-md'>Progress tracking</li>
                        <li className='font-semibold text-md'>offline access</li>
                    </ul>

                </div>

                <div className='flex flex-col items-center justify-center gap-2'>
                    <button className='bg-white text-black p-1 rounded-lg cursor-pointer'>Get Vocab</button>
                    <span className='text-black text-sm'>pay once, learn unlimited </span>
                </div>
            </div>
            <div className='bg-[#B1D38D] p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-106'>
                <div className='flex flex-col items-center '>
                    <p className='font-bold text-lg'>Pro</p>
                    <p className='font-sm'>Best value for lifelong learners</p>
                </div>
                <div className='flex gap-2 items-baseline'>
                    <p className='font-bold text-3xl'>$19.99</p>
                    <span className='text-md'>usd</span>
                </div>
                <div>
                    <ul className='flex flex-col gap-2'>
                        <li className='font-semibold text-md'>All features + AI insights </li>
                        <li className='font-semibold text-md'>custom challenges</li>
                        <li className='font-semibold text-md'>community</li>
                    </ul>

                </div>

                <div className='flex flex-col items-center justify-center gap-2'>
                    <button className='bg-[#415926] text-white p-1 rounded-lg cursor-pointer'>Get Vocab</button>
                    <span className='text-black text-sm'>pay once, learn unlimited </span>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default Pricing
