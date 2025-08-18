"use client"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
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

export function DialogCloseButton({wordInfo}:wordInfoProps) {

    const addWord = api.word.addWord.useMutation()

    const handleAddToCollection = ()=>{
        addWord.mutate(wordInfo)
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your Word: {wordInfo.name}</DialogTitle>
        </DialogHeader>

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
                <Input
                defaultValue={wordInfo?.meaning[0]}
                readOnly
                />
                <Input
                defaultValue={wordInfo?.meaning[1]}
                readOnly
                />
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
                <Input
                defaultValue={wordInfo.synonyms[0]}
                readOnly
                />
                <Input
                defaultValue={wordInfo.synonyms[1]}
                readOnly
                />
            </div>
        </div>

        {addWord.isPending && <p>Adding word...</p>}
        {addWord.isSuccess && <p>Word added!</p>}
        {addWord.isError && <p>Error: {addWord.error.message}</p>}


        <DialogFooter className="sm:justify-start">
          <DialogClose asChild className="flex flex-wrap">
            <Button type="button" disabled={addWord.isPending} onClick={handleAddToCollection} variant="secondary">
              Add to Collection
            </Button>
            <Button type="button" variant="secondary">
              Ignore
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
