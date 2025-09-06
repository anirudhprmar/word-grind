"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { QuizStartModal } from '~/app/_components/QuizStartModal'

interface WordProp{
  info:{
    id:number
    userId: string
    name:string
    meaning:string
    example:string[]
    pronunciation:string
    synonyms:string[]
    createdAt:Date
    learned:boolean
  },
  total:number 
}


export default function DisplayWord({info,total}:WordProp) {
  const[wordClicked,setWordClicked] = useState<boolean>(false)

  return (
    <div>
      {info.learned === false ? <div>
        <Button className='font-bold hover:transition-shadow hover:shadow-xl cursor-pointer shadow-md' size={'lg'}
      onClick={()=>setWordClicked(true)}
      >{info.name}</Button>

      </div> : <div>
        <p>No Words exist to practice</p>
        </div>}

        <div>
        {wordClicked && <QuizStartModal totalQuestions={total} wordInfo={info} onClose={()=>setWordClicked(false)} />}
        </div>

    </div>
  )
}
