// import Image from "next/image";
import Image from "next/image";
import type { RefObject } from "react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}
 

function Features({ref}:props) {
  return (
    <section ref={ref} className=" flex flex-col items-center justify-center md:justify-around gap-5    rounded-2xl  transition-shadow duration-300  min-h-screen max md:w-full pt-30">
      
      <div     
      className="flex gap-4 flex-col max-w-90 md:max-w-full">
        <h2
        className="font-bold text-2xl text-center md:text-3xl lg:text-4xl text-secondary-foreground">What is an AI-powered vocabulary learning app, and how does it work?

 </h2>
        <p
        className="text-md text-center md:text-xl font-semibold text-secondary-foreground">It is the time to up your game </p>

      </div>
    <div className="max-w-90 md:max-w-full"> 
            <blockquote className="text-secondary-foreground">
      Wordgrind isn’t just another vocabulary app. It’s a smart, interactive learning platform that turns passive reading into real language mastery:
            </blockquote>
       </div>

      <div
      className="grid grid-cols-5 grid-rows-2 gap-2 p-5 h-full w-full md:px-50">

          <div className=" col-span-3 row-span-1  p-1 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30  bg-secondary  rounded-2xl text-secondary-foreground flex flex-col  gap-2 items-center justify-center ">
             {/* */}
             <Image src={'/collection.png'} width={500} height={500} alt="a page from dashboard showcasing collection" className="rounded-md border shadow-sm"/>
             <div className="flex flex-col items-start justify-center py-2 gap-2">
              <p className=" text-sm md:text-xl font-bold font-serif text-left ">Build Your Personal Word Collection</p>
              <p className="text-sm md:text-md font-extralight text-left">Organize and grow your own library of useful words—see your vocabulary blossoming, not just slipping away.</p>
             </div>
          </div>

          <div className=" col-span-2 row-span-1  p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl  text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
              <Image src={'/progress.png'} width={500} height={500} alt="a page from dashboard showcasing collection" className="rounded-md border shadow-sm"/>

              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <p className=" text-sm md:text-xl font-bold font-serif ">Progress measurement</p>
                <p className="text-sm md:text-md font-extralight">Use clear scoring, badges, and progress bars. Send regular reports and learning summaries.</p>
              </div>
          </div>

          {/* put all the images and videos in public folder */}

          <div className=" col-span-2 row-span-2 p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl  text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
             <Image src={'/quiz.png'} width={500} height={500} alt="a page from dashboard showcasing collection" className="rounded-md border shadow-sm"/>
             <div className="flex flex-col items-center justify-center gap-2 py-2">
              <p className=" text-sm md:text-xl font-bold font-serif ">AI personalization </p>
              <p className="text-sm md:text-md font-extralight">Algorithms track errors and successes, adapting word lists and exercises to focus on areas needing improvement, ensuring efficient learning for each user.</p>

             </div>
         
          </div>

          <div className="col-span-3 row-span-2 p-4 md:p-10 text-center border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-secondary  rounded-2xl text-secondary-foreground flex flex-col  gap-2 items-center justify-center">
            <Image src={'/conversation.png'} width={500} height={500} alt="a page from dashboard showcasing collection" className="rounded-md border shadow-sm"/>
            <div className="flex flex-col items-start  justify-center gap-2 py-2">
              <p className=" text-sm md:text-xl font-bold font-serif ">Realistic conversation</p>
              <p className="text-sm md:text-md font-extralight text-left ">Use AI chatbots simulating native speakers in real-world scenarios, providing opportunities for dialog and context practice.</p>
            </div>
          </div>
      </div>
    </section>
  )
}

export default Features
