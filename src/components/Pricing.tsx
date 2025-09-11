import React, { type RefObject } from 'react'
import {ArrowRight, Check} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { authClient } from '~/lib/auth-client';

interface props{
    ref?: RefObject<HTMLElement | null>;
}
function Pricing({ref}:props) {


    const buyWordGrind = async()=>{
        // await authClient.checkout({
        //     // products:["92a9f006-5b90-4554-b243-60c62246f7a2"],
        //     products:["0f34d8c7-357b-49e9-8748-31151a72f57f"],
        //     slug:"pro"
        // })
    }  

  return (
     <section ref={ref} className="max-sm:scroll-mt-20 mt-10 flex flex-col items-center justify-center gap-5  min-h-screen">
      <div 
      className="flex gap-4 flex-col max-w-90 md:max-w-full" 
      >
        <h4
        className="font-bold text-2xl md:text-3xl text-center lg:text-4xl px-2">Unlock Your Potential—Choose Your Path to Fluency </h4>
        <p className='text-md md:text-lg text-center lg:text-xl font-semibold text-secondary-foreground'>Start mastering vocabulary your way.</p>
      </div>

        <div 
        className='flex items-center justify-center flex-wrap  p-5'>
            
            <Card
            className='max-h-fit'
            >
            <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Best value for lifelong learners</CardDescription>
            </CardHeader>

            <CardContent  >
               <div className='flex items-center justify-center gap-3 mb-6 pt-4'>
                    <p className='font-bold text-3xl md:text-4xl flex gap-1 items-center font-serif'><span>$</span>9.99</p>
                    <span className='text-sm'>/month</span>
                </div>
                <div className=' mt-2 border-t'></div>
                <div className='mt-6 pt-4'>
                    <ul className='flex flex-col gap-2'>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Add Unlimited Words</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Practice Unlimited Times</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Unlimited AI conversations</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Track progress with detailed insights</li>
                        <li className='font-semibold text-lg flex gap-1 items-center'><Check/>Learn and grow with the community</li>
                    </ul>

                </div>
            </CardContent>

            <CardFooter>
              <div className='flex flex-col items-center justify-center gap-2 w-full '>
                <Button variant={'default'} size={'lg'} className='bg-primary w-full  text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center' type='button' onClick={buyWordGrind}>Get WordGrind <ArrowRight/></Button>
            </div>
            </CardFooter>
            </Card>

            
        </div>
    </section>
  )
}

export default Pricing
