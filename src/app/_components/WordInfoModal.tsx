"use client"
import { Button } from "~/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { api } from "~/lib/api"

interface wordInfoProps {
    wordInfo:{
        userId: string,
        name:string,
        meaning:string,
        example:string[],
        pronunciation:string,
        synonyms:string[],
        learned: boolean
    }
}

export function WordInfoModal({wordInfo}:wordInfoProps) {

    const addWord = api.word.addWord.useMutation()

    const handleAddToCollection = ()=>{
        addWord.mutate(wordInfo)
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline">Show the Word</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Your Word: {wordInfo.name}</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex items-center gap-2">
            <div className="flex flex-col">
                <Label>
                    Meaning
                </Label>
                <Input
                defaultValue={wordInfo.meaning}
                readOnly
                />
            </div>
            <div className="flex flex-col">
                <Label>
                    Example
                </Label>
                { wordInfo?.example?.map(ex => (
                     <Input
                     key={ex}
                    defaultValue={ex }
                    readOnly
                    />
                  ))
                }
            </div>
            <div className="flex flex-col">
                <Label>
                    Pronunciation
                </Label>
                <Input
                defaultValue={wordInfo.pronunciation}
                readOnly
                />
            </div>
            <div className="flex flex-col">
                <Label>
                    Synonyms
                </Label>

                {
                  wordInfo?.synonyms?.map(word => (
                     <Input
                     key={word}
                    defaultValue={word }
                    readOnly
                    />
                  ))
                }
            </div>
        </div>

        {addWord.isPending && <p>Adding word...</p>}
        {addWord.isSuccess && <p>Word added!</p>}
        {addWord.isError && <p>Error: {addWord.error.message}</p>}


        <AlertDialogFooter className="sm:justify-start">
          <div className="flex flex-wrap">
            <AlertDialogAction>

              <Button type="button" disabled={addWord.isPending} onClick={handleAddToCollection} variant="secondary">
                Add to Collection
              </Button>
            </AlertDialogAction>

            <AlertDialogCancel>
              <Button type="button" variant="secondary">
                Ignore
              </Button>

            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
