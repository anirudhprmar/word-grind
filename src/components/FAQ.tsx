import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"

export default function FAQ() {
  return (
    <section className=' mx-30 px-4 flex justify-center py-30'>
      <div className='flex flex-col gap-4 w-full'>
        <h5 className='font-bold text-3xl'>Frequently Asked Questions</h5>
        <p className='font-medium text-md'>Have another question? Contact me on <span className='underline'>X</span> or by <span className='underline'>email</span></p>
      </div>
      <div className='w-full  rounded-xl '>

        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>What is Vocab Grinder?</AccordionTrigger>
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
