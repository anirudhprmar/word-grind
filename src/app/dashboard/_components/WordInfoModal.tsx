"use client"
import { useEffect, useState } from "react"

import { Button } from "~/components/ui/button"
import InputBox from "~/components/ui/inputbox"
import { Label } from "~/components/ui/label"
import { api } from "~/lib/api"
import { XIcon } from "lucide-react"
import { toast } from "sonner"


interface wordInfoProps {
    wordInfo:{
        userId: string,
        name:string,
        meaning:string,
        example:string[],
        pronunciation:string,
        synonyms:string[],
    }
    onClose:()=>void
}

interface wordProp{
    userId: string,
    name:string,
    meaning:string,
    example:string[],
    pronunciation:string,
    synonyms:string[],
}

export function WordInfoModal({wordInfo,onClose}:wordInfoProps) {

  const [isOpen,setIsOpen] = useState(false)
  const [word,setWord] = useState<wordProp | null>(null)
  
  useEffect(()=>{
    if(wordInfo) {
      setWord(wordInfo)
      setIsOpen(true)
    }
    },[wordInfo])

    
    const addWord = api.word.addWord.useMutation() 

   const handleAddToCollection = async () => {
  try {
    if (!wordInfo) {
      toast.error("No word information available");
      return;
    }

    console.log("Adding word:", wordInfo);
    const addingWord = await addWord.mutateAsync(wordInfo);
    console.log("Response from mutation:", addingWord);
    
    // Always show toast first before other actions
    if (addingWord?.message === "word added") {
      // Show toast first
      toast.success("Word added successfully ✅");
      
      // Wait longer (2 seconds) before closing the modal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Close modal and cleanup
      setWord(null);
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    } else {
      console.log("Unexpected response:", addingWord);
      toast.error("Failed to add word");
    }

  } catch (error) {
    console.error("Error adding word:", error);
    // Handle mutation error specifically
    if (addWord.isError && addWord.error?.message) {
      toast.error(addWord.error.message);
    } else {
      // Generic error fallback
      toast.error("Failed to add word to collection");
    }
  }
}

    const handleIgnore = () => {
      setIsOpen(false)
      if(onClose){
        onClose()
      } 
    }

  return (
  <div>

      { isOpen && (<div className="fixed inset-0 z-50 bg-black/50">
      <div className=" bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]  gap-4 rounded-lg border p-6  shadow-lg duration-200 sm:max-w-lg max-h-full  overflow-auto ">
        <div>
            <h2 className=" font-serif text-center text-lg leading-none font-semibold">{word?.name.toUpperCase()}</h2>
          </div>

          <div className="items-center gap-2 grid grid-cols-1  ">

              <div className="flex flex-col gap-1 items-start">
                  <Label>
                      Meaning
                  </Label>

                  <InputBox 
                  content={word?.meaning ?? ""}
                  className=" h-fit"
                  />
                  
              </div>
              <div className="flex flex-col items-start gap-1">
                  <Label>
                      Examples
                  </Label>
                  { word?.example?.map(ex => (
                      <InputBox
                      key={ex}
                      content={ex }
                      className="h-fit"
                      />
                    ))
                  }
              </div>
              <div className="flex flex-col items-start gap-1">
                  <Label>
                      Pronunciation
                  </Label>
                  <InputBox
                  content={word?.pronunciation ?? ""}
                  className="h-fit"
                  />
              </div>
              <div className="flex flex-col items-start gap-1">
                  <Label>
                      Synonyms
                  </Label>

                  {
                    word?.synonyms?.map(word => (
                  <InputBox
                      key={word}
                      content={word }
                      className="h-fit"
                      />
                    ))
                  }
              </div>
          </div>


          <div className="sm:justify-start">
                <Button type="button" variant="secondary" onClick={handleIgnore}
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4" 
                >
                  <XIcon/> 
                </Button>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <div>
                <Button type="button" disabled={addWord.isPending} onClick={handleAddToCollection} variant="secondary" className="cursor-pointer">
                  Add to Collection
                </Button>
              </div>

              <div>
                <Button type="button" variant="secondary" onClick={handleIgnore}
                className="cursor-pointer"
                >
                  Ignore 
                </Button>
              </div>
            </div>
          </div>
        </div>
    </div>)}

  </div>
    
  )
}
