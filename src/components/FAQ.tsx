import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"
import Link from 'next/link'

export default function FAQ() {
    
  return (
    <section className=' md:mx-30 px-4 grid grid-cols-1 md:grid-cols-2  pt-30'>

      <div 
      className='flex flex-col gap-4 w-full'>
        <h5
        className='font-bold text-2xl md:text-3xl lg:text-4xl text-center p-2'>Frequently Asked Questions</h5>
        <p 
        className='font-medium text-md md:text-lg text-center font-serif'>Have another question? Contact me on <span className='underline'><Link href="https://x.com/anirudhprmar" target="_blank" rel="noopener noreferrer">X</Link></span> or by <span className='underline'><Link href="mailto:anirudhparmar2004@gmail.com" >
                Mail
              </Link></span></p>
      </div>
      <div className='w-full  rounded-xl pt-10 '>

        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>What is Word Grind?</AccordionTrigger>
            <AccordionContent>
            Wordgrind is an interactive language learning platform powered by AI. It helps you build and remember new vocabulary, test your knowledge, and practice real conversations in English.
            </AccordionContent>
        </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '>Will Wordgrind really help me learn faster?</AccordionTrigger>
            <AccordionContent>
            Yes—Wordgrind turns passive reading into active learning, using smart quizzes and AI feedback to make new words stick and boost your real-world confidence.
            </AccordionContent>
        </AccordionItem>
        </Accordion>
       
        <Accordion type="single" collapsible >
        <AccordionItem value="item-1" className='px-10'>
            <AccordionTrigger className='text-lg cursor-pointer '> How does AI-powered feedback work?</AccordionTrigger>
            <AccordionContent>
            Our AI reviews your progress and conversation, offering tailored advice, corrections, and tips to help you use words naturally and correctly.
            </AccordionContent>
        </AccordionItem>
        </Accordion>


      </div>
    </section>
  )
}
