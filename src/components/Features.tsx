import type { RefObject } from "react";
import { motion } from "motion/react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}
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

function Features({ref}:props) {
  return (
    <section ref={ref} className="max-sm:scroll-mt-20 flex flex-col items-center justify-center gap-25 px-5 p-5 mb-5   rounded-2xl  transition-shadow duration-300  min-h-screen">
      
      <motion.div
      initial="hidden"
      whileInView="visible"       // For scroll in view
      viewport={{ once: true }}   // Animate only the first time in view
      transition={{ staggerChildren: 0.05 }}
      variants={variants}       
      className="flex gap-4 flex-col">
        <motion.h2
        transition={{ duration: 1, ease: 'easeInOut' }}
              variants={variants}
        className="font-bold text-3xl text-center text-secondary-foreground">Wondering why you read every day but still don’t see improvements in your vocabulary ?  </motion.h2>
        <motion.p
        transition={{ duration: 1, ease: 'easeInOut' }}
              variants={variants}
        className="text-lg text-center font-semibold text-secondary-foreground">It is the time to up your game </motion.p>
      </motion.div>

      <motion.div
       initial="hidden"
      whileInView="visible"       
      viewport={{ once: true }}   
      transition={{ duration: 1, ease: 'easeInOut' }}
      variants={variants}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">

          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30  bg-primary hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-primary-foreground ">
             {/* */}
              <p className="text-2xl font-semibold">AI-Powered Word Detection: </p>
              <span className="font-md font-medium"> Scans your reading material and highlights unfamiliar words in real-time.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-primary hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-primary-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-primary hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-primary-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-primary hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-primary-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
      </motion.div>
    </section>
  )
}

export default Features
