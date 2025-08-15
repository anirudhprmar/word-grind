import Image from "next/image";
import type { RefObject } from "react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}
 

function Features({ref}:props) {
  return (
    <section ref={ref} className=" flex flex-col items-center justify-center md:justify-around gap-5    rounded-2xl  transition-shadow duration-300  min-h-screen max md:w-full">
      
      <div     
      className="flex gap-4 flex-col max-w-90 md:max-w-full">
        <h2
        className="font-bold text-3xl text-center md:text-4xl text-secondary-foreground">Wondering why you read every day but your vocabulary still isn’t growing?

 </h2>
        <p
        className="text-lg text-center md:text-xl font-semibold text-secondary-foreground">It is the time to up your game </p>

      </div>
    <div className="max-w-90 md:max-w-full"> 
            <blockquote className="text-secondary-foreground">
      Wordgrind isn’t just another vocabulary app. It’s a smart, interactive learning platform that turns passive reading into real language mastery:
            </blockquote>
       </div>

      <div
      className="grid grid-cols-5 grid-rows-2 gap-2 p-5 h-full w-full md:px-50">

          <div className=" col-span-3 row-span-1  p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30  bg-secondary  rounded-2xl text-secondary-foreground flex flex-col  gap-2 items-center justify-center ">
             {/* */}
              <p className=" text-sm md:text-3xl font-bold font-serif  ">Build Your Personal Word Collection</p>
              <p className="text-sm md:text-lg font-extralight">Organize and grow your own library of useful words—see your vocabulary blossoming, not just slipping away.</p>
          </div>

          <div className=" col-span-2 row-span-1  p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl  text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
              
              <p className=" text-sm md:text-3xl font-bold font-serif ">Test and Challenge Your Knowledge</p>
              <p className="text-sm md:text-lg font-extralight">Push yourself with quick quizzes that make new words stick and reveal what you really know.</p>
          </div>

          {/* put all the images and videos in public folder */}

          <div className=" col-span-2 row-span-2 p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl  text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
             
              <p className=" text-sm md:text-3xl font-bold font-serif ">Get Instant, AI-Powered Feedback </p>
              <p className="text-sm md:text-lg font-extralight">Confused or stuck? Our smart AI guides you, corrects your usage, and keeps you moving forward.</p>
         
          </div>

          <div className="col-span-3 row-span-2 p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
          
              <p className=" text-sm md:text-3xl font-bold font-serif ">Practice in Real Conversations.</p>
              <p className="text-sm md:text-lg font-extralight">Chat one-on-one with our AI to test new words in context, build confidence, and become truly fluent.</p>
          </div>
      </div>
    </section>
  )
}

export default Features
