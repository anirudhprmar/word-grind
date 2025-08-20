'use client'
import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { useCompletion } from '@ai-sdk/react';
import { WordInfoModal } from './WordInfoModal'

interface workObjProps {
     name:string,
    meaning:string,
    example:string[],
    pronunciation:string,
    synonyms:string[],
}

interface prop {
  userId:string
}

//atleast get the userid
export default function WordSearchInput({userId}:prop) {

    const [isPending,setIsPending] = useState(false)
      
      const formSchema = z.object({
  prompt: z.string().min(2, {
    message: "word must be at least 2 characters.",
  }),
})


const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    prompt: "",
  },
})
  
const word = form.watch("prompt")

 const { completion, complete } = useCompletion({
    api: '/api/completion',
  });

  //on getting completion -> pushh forward this data to modal 

  const userID = userId
  const wordObj:workObjProps = completion && JSON.parse(completion)
  console.log(wordObj)

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsPending(true)
    console.log(values)
    await complete(values.prompt);
    form.reset()
    setIsPending(false)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='flex flex-col'>

    <div className='relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="What's the word you'd like to explore" {...field} 
                  className='text-left px-5 pt-7 pb-15 bg-accent text-foreground' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
          <Button disabled={isPending} variant={'ghost'} size={'sm'} type='submit' className={`absolute right-7 bottom-4 text-foreground   rounded-full p-1 ${word ? 'bg-primary text-primary-foreground':'bg-primary-foreground'}`}>
            <ArrowUp className='cursor-pointer'/>
          </Button>
        </form>
      </Form>
    </div>

     <div className=' mt-10'>
      {wordObj && userID ? 
        <WordInfoModal wordInfo={{userId:userID,name:wordObj?.name,meaning:wordObj?.meaning,pronunciation:wordObj?.pronunciation,example:wordObj?.example,synonyms:wordObj?.synonyms,learned:false}}/>
      : ""
      }
      </div>

    </div>
  )
}