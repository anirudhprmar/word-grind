import React, { type RefObject } from 'react'
import {ArrowRight, Check} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface props{
    ref?: RefObject<HTMLElement | null>;
}
function Pricing({ref}:props) {

      

  return (
     <section ref={ref} className="max-sm:scroll-mt-20 mt-10 flex flex-col items-center justify-center gap-5  min-h-screen">
      <div 
      className="flex gap-4 flex-col max-w-90 md:max-w-full" 
      >
        <h4
        className="font-bold text-3xl text-center md:text-4xl px-2">Unlock Your Potential—Choose Your Path to Fluency </h4>
        <p className='text-lg text-center md:text-xl font-semibold text-secondary-foreground'>Flexible plans for every learner. Start mastering vocabulary your way.</p>
      </div>

        <div 
        className='flex  gap-10 items-center justify-center flex-wrap  p-5'>

            <Card
            className='max-h-fit'
            >
            <CardHeader>
                <CardTitle>Standard</CardTitle>
                <CardDescription>For serious vocabulary builders</CardDescription>
            </CardHeader>

            <CardContent>
                <div className='mb-6 pt-4'>
                    <p className='font-bold text-3xl md:text-4xl flex gap-1 items-center font-serif'><span>$</span>19.99</p>
                </div>
                 <div className=' mt-2 border-t'></div>
                <div className='mt-6 pt-4'>
                    <ul className='flex flex-col gap-2 '>
                        <li className='font-semibold text-lg flex gap-2 items-center '><Check/>Build your personal word collection</li>
                        <li className='font-semibold text-lg flex gap-2 items-center '><Check/>Limited quizzes</li>
                        <li className='font-semibold text-lg flex gap-2 items-center '><Check/>Basic AI feedback</li>
                        <li className='font-semibold text-lg flex gap-2 items-center '><Check/>Limited conversational practice</li>
                    </ul>

                </div>
            </CardContent>

            <CardFooter>
            <div className='flex flex-col items-center justify-center gap-2 w-full '>
                <Button variant={'default'} size={'lg'} className='bg-primary w-full  text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center'>Get WordGrind <ArrowRight/></Button>
                <span className='text-foreground text-sm font-bold'>pay once, learn unlimited </span>
            </div>
            </CardFooter>
            </Card>
            
            <Card
            className='max-h-fit'
            >
            <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Best value for lifelong learners</CardDescription>
            </CardHeader>

            <CardContent  >
               <div className=' mb-6 pt-4'>
                    <p className='font-bold text-3xl md:text-4xl flex gap-1 items-center font-serif'><span>$</span>39.99</p>
                </div>
                <div className=' mt-2 border-t'></div>
                <div className='mt-6 pt-4'>
                    <ul className='flex flex-col gap-2'>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Everything in Starter, plus:</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Unlimited AI conversations</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Advanced feedback and explanations</li>
                        <li className='font-semibold text-lg flex gap-2 items-center'><Check/>Track progress with detailed insights</li>
                        {/* <li className='font-semibold text-lg flex gap-1 items-center'><Check/>community</li> */}
                    </ul>

                </div>
            </CardContent>

            <CardFooter>
              <div className='flex flex-col items-center justify-center gap-2 w-full '>
                <Button variant={'default'} size={'lg'} className='bg-primary w-full  text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center'>Get WordGrind <ArrowRight/></Button>
                <span className='text-foreground text-sm font-bold'>pay once, learn unlimited </span>
            </div>
            </CardFooter>
            </Card>

            
        </div>
    </section>
  )
}

export default Pricing
