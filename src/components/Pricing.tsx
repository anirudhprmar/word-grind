import React, { type RefObject } from 'react'
import {ArrowRight, Check, MoveRight} from 'lucide-react'
import { Button } from './ui/button'
import {motion} from 'motion/react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface props{
    ref?: RefObject<HTMLElement | null>;
}
function Pricing({ref}:props) {

      const variants = {
  hidden: {
    filter: "blur(10px)",
    transform: "translateY(20%)",
    opacity: 0
  },
  visible: {
    filter: "blur(0)",
    transform: "translateY(0)",
    opacity: 1
  }
}

  return (
     <section ref={ref} className="max-sm:scroll-mt-20 mt-10 flex flex-col items-center justify-center gap-5  min-h-screen">
      <motion.div
      initial="hidden"
      whileInView="visible"       // For scroll in view
      viewport={{ once: true }}   // Animate only the first time in view
      transition={{ staggerChildren: 0.05 }}
      variants={variants}   
      >
        <motion.h4
         transition={{ duration: 1, ease: 'easeInOut' }}
              variants={variants}
        className="font-bold text-3xl text-center px-2">Choose your Learning journey </motion.h4>
      </motion.div>

        <motion.div
        initial="hidden"
      whileInView="visible"       
      viewport={{ once: true }}   
     transition={{ duration: 1, ease: 'easeInOut' }}      
    variants={variants}   
        className='flex  gap-10 items-center justify-center flex-wrap  p-5'>
            {/* <div className='bg-card p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-120'>
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
                    <Button variant={'default'}  size={'lg'} className='bg-primary p-2 text-xl w-full rounded-lg cursor-pointer'>Get Vocab</Button>
                    <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
                </div>
            </div> */}
{/* finish it up and update the prices and the language used */}
            <Card
            className='h-120'
            >
            <CardHeader>
                <CardTitle>Standard</CardTitle>
                <CardDescription>For serious vocabulary builders</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
            <div className='flex flex-col items-center justify-center gap-2 w-full '>
                <Button variant={'default'} size={'lg'} className='bg-primary w-full  text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center'>Get Word Grind <ArrowRight/></Button>
                <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
            </div>
            </CardFooter>
            </Card>
            
            <Card
            className='h-120'
            >
            <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Best value for lifelong learners</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <div className='flex flex-col items-center justify-center gap-2 w-full '>
                <Button variant={'default'} size={'lg'} className='bg-primary w-full  text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center'>Get Word Grind <ArrowRight/></Button>
                <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
            </div>
            </CardFooter>
            </Card>

            {/* <div className='bg-card p-2 flex flex-col items-center justify-around gap-5 rounded-lg shadow-lg w-80 h-120'>
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

                <div className='flex flex-col items-center justify-center gap-2 w-full px-3'>
                    <Button variant={'default'} size={'lg'} className='bg-primary w-full text-primary-foreground p-2 text-md rounded-lg cursor-pointer flex items-center'>Get Word Grind <ArrowRight/></Button>
                    <span className='text-black text-md font-bold'>pay once, learn unlimited </span>
                </div>
            </div> */}
            
        </motion.div>
    </section>
  )
}

export default Pricing
