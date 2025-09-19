import {  type RefObject } from "react";
import { motion } from "motion/react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}

function Demo({ref}:props) {
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
     <motion.section
      initial="hidden"
      whileInView="visible"       // For scroll in view
      viewport={{ once: true }}   // Animate only the first time in view
      transition={{ staggerChildren: 0.05 }}
      variants={variants}       
     ref={ref}  className="flex flex-col items-center justify-center gap-10 min-h-screen">
      <div>
        <motion.h3
         transition={{ duration: 1, ease: 'easeInOut' }}
              variants={variants}
        className="font-bold text-3xl text-center px-4">Learning new vocab is so easy and fun !! </motion.h3>
      </div>

        <motion.div
         transition={{ duration: 1, ease: 'easeInOut' }}
              variants={variants}
        >
            {/* <span className="text-sm text-green-100 rounded-xl">demo video here</span> */}
              <video controls width="600" height="400" src="/demo.mp4" className="relative border backdrop-filter backdrop-blur-lg bg-opacity-30  text-white rounded-xl w-200" />
        </motion.div>
    </motion.section>
  )
}

export default Demo
