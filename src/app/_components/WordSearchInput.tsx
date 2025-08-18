'use client'
import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'


export default function WordSearchInput() {
      const [isPending,setIsPending] = useState(false)
      
      const formSchema = z.object({
  wordMsg: z.string().min(2, {
    message: "word must be at least 2 characters.",
  }),
})


const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    wordMsg: "",
  },
})
  
const word = form.watch("wordMsg")


function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsPending(true)
    console.log(values)
    // await server actions with this msg that will hit the out ai and which will trigger a popup open with everything about that word
    form.reset()
    setIsPending(false)
  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className='relative'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="wordMsg"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="What's the word you'd like to explore" {...field} 
                  className='text-left px-5 pb-15 bg-foreground text-primary-foreground ' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} variant={'ghost'} size={'sm'} type='submit' className={`absolute right-7 bottom-4 text-foreground   rounded-full p-1 ${word ? 'bg-primary-foreground':'bg-secondary-foreground'}`}>
            <ArrowUp className='cursor-pointer'/>
          </Button>
        </form>
      </Form>
    </div>
  )
}