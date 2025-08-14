import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import {motion} from 'motion/react'

export default function FAQ() {
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
    <section className=' md:mx-30 px-4 grid grid-cols-1 md:grid-cols-2  pt-30'>

      <motion.div 
      initial="hidden"
      whileInView="visible"       // For scroll in view
      viewport={{ once: true }}   // Animate only the first time in view
      transition={{ staggerChildren: 0.05 }}
      variants={variants}   
      className='flex flex-col gap-4 w-full'>
        <motion.h5
         transition={{ duration: 1, ease: 'easeInOut' }}
         variants={variants}
        className='font-bold text-3xl text-center p-2'>Frequently Asked Questions</motion.h5>
        <motion.p 
        transition={{ duration: 1, ease: 'easeInOut' }}
         variants={variants}
        className='font-medium text-md text-center font-serif'>Have another question? Contact me on <span className='underline'>X</span> or by <span className='underline'>email</span></motion.p>
      </motion.div>
      <div className='w-full  rounded-xl pt-10 '>

        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>What is Word Grind?</AccordionTrigger>
            <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>How does it work?</AccordionTrigger>
            <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
        </Accordion>
       
        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>How will you benifit from it?</AccordionTrigger>
            <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
        </AccordionItem>
        </Accordion>


      </div>
    </section>
  )
}
