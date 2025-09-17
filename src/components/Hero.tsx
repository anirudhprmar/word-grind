import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import Link from "next/link";


function Hero() {

     const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

    const vocabularyWords = [
  { word: "serendipity", definition: "pleasant surprise discovery", position: { top: '40%', right: '15%' } },
  { word: "ephemeral", definition: "lasting for a short time", position: { top: '55%', right: '20%' } },
  { word: "mellifluous", definition: "sweet flowing sound", position: { top: '25%', right: '25%' } },
  { word: "wanderlust", definition: "desire to travel", position: { top: '34%', right: '35%' } },
  { word: "eloquent", definition: "fluent and persuasive", position: { top: '45%', right: '30%' } }
];
  return (
    <section className="md:flex md:items-center md:justify-start px-3 md:px-50 min-h-screen max-sm:pt-45  md:relative ">

      <div className="flex flex-col items-start gap-10 text-center ">
        <motion.h1 
         initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.25 }}
        className=" text-4xl md:text-5xl font-bold max-w-130  tracking-tight">Unlock Your Ultimate Vocabulary – Fast, Fun, and Forever
        </motion.h1>
        <motion.p 
         initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.45 }}
        className="font-normal text-lg md:text-xl max-w-130 font-serif  ">Level up your language with Wordgrind: build your word collection, master meanings, and practice real conversations. Get AI feedback and boost your fluency—all in one addictive app for ambitious learners.</motion.p>
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8,delay:0.7 }}
        className="flex justify-center items-center w-full px-10"
        >
          <Link href={'/pricing'} className="bg-foreground p-2 text-primary-foreground  rounded-lg text-xl cursor-pointer">Get WordGrind</Link>
        </motion.div>
      </div>

<motion.div
   initial={{ opacity: 0}}
   animate={{ opacity: 1}}
   transition={{ duration: 0.8,delay:0.8 }}
   className="hidden md:block"
>
     {vocabularyWords.map((vocab, index) => (
        <div
          key={vocab.word}
          className={`absolute floating-word ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 `}
          style={{
            ...vocab.position,
            animationDelay: `${index * 0.5}s`
          }}
        >
          <div className="bg-primary backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="text-primary-foreground font-semibold text-sm glow-word">
              {vocab.word}
            </div>
            <div className="text-primary-foreground text-xs mt-1">
              {vocab.definition}
            </div>
          </div>
        </div>
      ))}
</motion.div>
      
    </section>
  )
}

export default Hero
