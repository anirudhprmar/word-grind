import { useEffect, useState, type RefObject } from "react";
import { motion } from "motion/react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}

function Demo({ref}:props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
     <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      ref={ref}  
      className="flex flex-col items-center justify-center gap-10 min-h-screen px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
      >
        <h3 className="font-bold text-3xl md:text-4xl text-center px-4">
          See WordGrind in Action
        </h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="text-lg text-muted-foreground text-center mt-4 max-w-2xl"
        >
          Watch how easy it is to build your vocabulary and practice with AI
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1, 
          delay: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoothness
        }}
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <video 
          controls 
          width="600" 
          height="400" 
          src="/demo.mp4" 
          className="relative border backdrop-filter backdrop-blur-lg bg-opacity-30 text-white rounded-xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl w-200 max-w-full h-auto" 
        />
      </motion.div>
    </motion.section>
  )
}

export default Demo
