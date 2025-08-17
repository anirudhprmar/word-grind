'use client'
import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {useForm } from 'react-hook-form'

interface dataProps {
  wordMsg:string
}

export default function WordSearchInput() {
    const { register, handleSubmit,reset,watch } = useForm<dataProps>();
      const [isPending,setIsPending] = useState(false)
const word = watch("wordMsg")


  const onSubmit = async(data:dataProps)=>{
   try {
    setIsPending(true)
    console.log(data)
    // await server action with this msg related to word
    reset()
    setIsPending(false)
   } catch (error) {
    console.log(error)
   }
  }

  return (
    <div className='relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Input
      type='text'
      placeholder="What's the word you'd like to explore"
      className='text-left px-5 pb-15 bg-foreground text-primary-foreground '
      {...register("wordMsg")}

      />
        <Button disabled={isPending} variant={'ghost'} size={'sm'} type='submit' className={`absolute right-7 bottom-4 text-foreground   rounded-full p-1 ${word ? 'bg-primary-foreground':'bg-secondary-foreground'}`}>
          <ArrowUp className='cursor-pointer'/>
        </Button>
      </form>
    </div>
  )
}
