import React from 'react'

interface WordProp{
    id: number;
    userId: string;
    name: string;
    learned: boolean; 
}

//click on the word, quiz will start 

export default function DisplayWord(info:WordProp) {
  return (
    <div className='bg-primary text-primary-foreground border p-2 rounded-2xl'>
      {info.learned === false ? <div>
        <p className='font-bold cursor-pointer'>{info.name}</p>
      </div> : null}
      <div>
        {}
      </div>
    </div>
  )
}
