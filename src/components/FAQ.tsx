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
            <AccordionTrigger className='text-lg cursor-pointer '>How does it works?</AccordionTrigger>
            <AccordionContent>
         WordGrind acts as an intelligent vocabulary companion — letting you find and learn new words, then practice and master them efficiently through personalized AI-driven methods
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
            <AccordionTrigger className='text-lg cursor-pointer '>How does an AI vocabulary learning app differ from traditional methods like searching words on Google, and why is it more effective?
</AccordionTrigger>
            <AccordionContent>
            Instead of just looking up a word once on Google and forgetting it, an AI vocabulary learning app lets you save words in a personal database and uses AI-driven review schedules to prompt you to revisit and practice those words regularly. This method ensures better long-term retention by turning passive searches into active, personalized learning sessions.
            </AccordionContent>
        </AccordionItem>
        </Accordion>


      </div>
    </section>
  )
}
