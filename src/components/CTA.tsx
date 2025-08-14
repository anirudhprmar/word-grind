import { Button } from "./ui/button";
import {motion} from 'motion/react'


export default function CTA() {
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
    <section className="pt-30 pb-20  mt-30 px-5 flex flex-col items-center justify-around gap-5  max-w-full bg-secondary ">
      <motion.div
      initial="hidden"
      whileInView="visible"       // For scroll in view
      viewport={{ once: true }}   // Animate only the first time in view
      transition={{ staggerChildren: 0.05 }}
      variants={variants}   
      className="flex flex-col items-center justify-center gap-5">
        <motion.h6 
        transition={{ duration: 1, ease: 'easeInOut' }}
         variants={variants}
        className="font-bold text-3xl  md:text-4xl max-w-90 text-center md:max-w-full">Ready to transform your vocabulary?</motion.h6>

        <motion.div
        transition={{ duration: 1, ease: 'easeInOut' }}
         variants={variants}
        >
        <Button variant={'default'} size={'lg'} className="p-2 md:p-3 text-lg cursor-pointer  bg-primary text-primary-foreground w-fit rounded-lg">Get Word Grind</Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

