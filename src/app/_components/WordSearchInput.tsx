'use client'
import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import {useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { WordInfoModal } from './WordInfoModal'
import { getWordInfo } from '~/server/wordInfo'

interface wordObjProps {
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
      const [generation, setGeneration] = useState("");
      const [parsedWord,setParsedWord] = useState <wordObjProps | null>(null)

      
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


const userID = userId
  
const [isModalOpen,setIsModelOpen]= useState<boolean>(false)

async function onSubmit(values: z.infer<typeof formSchema>) {
  try {
    setIsPending(true)
    const text = await getWordInfo(values.prompt);
    setGeneration(text)
    form.reset()
    setIsPending(false)
  } catch (error) {
    console.log(error)
  }finally{
    setIsPending(false)
  }
}

useEffect(() => {
  if (generation && generation.trim() !== '') {
    try {
      const parsed: wordObjProps = JSON.parse(generation);
      setParsedWord(parsed);
    } catch (error) {
      console.error('Error parsing generation JSON:', error);
      setParsedWord(null); // reset on error
    }
  } else {
    setParsedWord(null); // reset if generation is empty
  }
}, [generation]);

useEffect(()=>{
  if(parsedWord){
    setIsModelOpen(true)
  }
},[parsedWord])

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
      {parsedWord && isModalOpen ? (
    <WordInfoModal
      onClose={()=>setIsModelOpen(false)}
      wordInfo={{
        userId: userID,
        name: parsedWord.name,
        meaning: parsedWord.meaning,
        pronunciation: parsedWord.pronunciation,
        example: parsedWord.example,
        synonyms: parsedWord.synonyms,
      }}
    />
  ) : null}
      </div>

    </div>
  )
}