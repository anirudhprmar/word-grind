import { useEffect, useState } from "react";


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
    <section className="flex items-center justify-start px-50 min-h-screen relative ">

      <div className="flex flex-col items-start gap-5">
        <h1 className="text-5xl font-bold max-w-100  tracking-tight">Unlock a World of  Words – Boost Your Vocabulary Effortlessly</h1>
        <p className="font-semibold text-xl max-w-110 ">Tired of reading daily without seeing real improvements ?  Vocab turns every page into a vocab victory with smart, personalized learning.</p>
        <button className="bg-green-900 text-white p-3 rounded-lg text-xl cursor-pointer">Get Vocab</button>
      </div>

     {vocabularyWords.map((vocab, index) => (
        <div
          key={vocab.word}
          className={`absolute floating-word ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
          style={{
            ...vocab.position,
            animationDelay: `${index * 0.5}s`
          }}
        >
          <div className="bg-green-900 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200 hover:scale-105 transition-transform duration-300">
            <div className="text-gray-50 font-semibold text-sm glow-word">
              {vocab.word}
            </div>
            <div className="text-gray-50 text-xs mt-1">
              {vocab.definition}
            </div>
          </div>
        </div>
      ))}
      
    </section>
  )
}

export default Hero
