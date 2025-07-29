

function Features() {
  return (
    <section className="flex flex-col items-center justify-around gap-5  bg-gray-100 min-h-screen">
      <div>
        <h2 className="font-bold text-3xl  ">Wondering why you read every day but still don’t see improvements in your vocabulary ?  </h2>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-5 p-5">
        <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-green-700 text-white rounded-xl">
            <p className="text-2xl font-semibold">AI-Powered Word Detection: </p>
            <span className="font-md font-medium"> Scans your reading material and highlights unfamiliar words in real-time.</span>
        </div>
        <div className="p-15 flex flex-col gap-3 border backdrop-filter backdrop-blur-lg bg-opacity-30 bg-green-700 text-white rounded-xl">
            <p className="text-2xl font-semibold">Personalized Flashcards</p>
            <span className="font-md font-medium">Creates custom decks based on your reading habits and progress.</span>
        </div>
      </div>
    </section>
  )
}

export default Features
