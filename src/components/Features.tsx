import type { RefObject } from "react";

interface props{
    ref?: RefObject<HTMLElement | null>;
}
 

function Features({ref}:props) {
  return (
    <section ref={ref} className="max-sm:scroll-mt-20 flex flex-col items-center justify-center gap-25 px-5 p-5 mb-5   rounded-2xl  transition-shadow duration-300  min-h-screen">
      
      <div     
      className="flex gap-4 flex-col">
        <h2
        className="font-bold text-3xl text-center text-secondary-foreground">Wondering why you read every day but still don’t see improvements in your vocabulary ?  </h2>
        <p
        className="text-lg text-center font-semibold text-secondary-foreground">It is the time to up your game </p>
      </div>

      <div
      className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">

          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30  bg-accent hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-accent-foreground ">
             {/* */}
              <p className="text-2xl font-semibold">AI-Powered Word Detection: </p>
              <span className="font-md font-medium"> Scans your reading material and highlights unfamiliar words in real-time.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-accent hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-accent-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-accent hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-accent-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
          <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-accent hover:border-green-300/50  rounded-2xl hover:shadow-lg transition-shadow duration-300 text-accent-foreground">
              <p className="text-2xl font-semibold">Personalized Flashcards</p>
              <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
          </div>
      </div>
    </section>
  )
}

export default Features
