import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { api } from "~/lib/api"
import { Toaster } from "./ui/sonner"
import { toast } from "sonner"

interface wordInfo{

  userId: string,
  name:string,
  meaning:string,
  example:string[],
  pronunciation:string,
  synonyms:string[],
}

const formSchema = z.object({
name: z.string().min(2).max(50),
meaning:z.string().min(2),
example: z.array(z.object({ value: z.string() })),
synonyms: z.array(z.object({ value: z.string() })),
pronunciation:z.string(),
})

export function AddWordDialogBox({userId}:{userId:string}) {

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      meaning:"",
      example: [],
      pronunciation:"",
      synonyms: []
    },
  })

  const {control} = form;
  const {fields:exampleFields,append:appendExample,remove:removeExample} = useFieldArray({
    control,
    name:"example"
  })
  const {fields:synonymsFields,append:appendSynonyms,remove:removeSynonyms} = useFieldArray({
    control,
    name:"synonyms"
  })

  const trpc = api.useUtils()
  const addWord = api.word.addWord.useMutation({
    onSuccess:async()=>{
      await trpc.word.invalidate()
    }
  })


  async function onSubmit(values: z.infer<typeof formSchema>) { 

    try {
      const exampleArray = Array.isArray(values.example) ? values.example : []
      const synonymsArray = Array.isArray(values.synonyms) ? values.synonyms : []
  
      const payload:wordInfo = {
        name:values.name,
        meaning:values.meaning,
        pronunciation:values.pronunciation,
        example: exampleArray.map((item) => item.value),
        synonyms: synonymsArray.map((item) => item.value),
        userId:userId
      }
      const addingWord = await addWord.mutateAsync(payload)
      if (addingWord) {
        toast("Word added!")
      }
      form.reset()
    } catch (error) {
      console.log("error in adding word",error)
      if (addWord.isError) {
        toast(`${addWord.error.message}`)
      }
    } 
  }

  return (
    <div>
      <Dialog>
        <Form {...form}> 
            <DialogTrigger asChild>
              <Button variant="outline">Add a Word</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogHeader>
                <DialogTitle>Add a Word of Choice</DialogTitle>
                <DialogDescription>
                  If you want to add your own word of choice to the collection. Input the details and click on save changes
                </DialogDescription>
              </DialogHeader>
                  <div className="flex flex-col gap-4">
                
                  <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="greatness" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="meaning"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meaning</FormLabel>
                      <FormControl>
                        <Input placeholder="capability to do something great" {...field} />
                      </FormControl>       
                      <FormMessage />
                    </FormItem>
                  )}
                />
                        <FormField
                  control={form.control}
                  name="pronunciation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pronunciation</FormLabel>
                      <FormControl>
                        <Input placeholder="grayt nuhs" {...field} />
                      </FormControl>            
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  {exampleFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={control}
                    name={`example.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Example</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button type="button" onClick={() => removeExample(index)}>Remove</Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" onClick={() => appendExample({value:""})}  className="cursor-pointer">Add Example</Button>


                {synonymsFields.map((field, index) => (
                  <FormField
                    key={field.id}
                    control={control}
                    name={`synonyms.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Synonym</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <Button type="button" onClick={() => removeSynonyms(index)}>Remove</Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <Button type="button" onClick={() => appendSynonyms({value:""})} className="cursor-pointer" >Add Synonyms</Button>

                

          </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">Cancel</Button>
                </DialogClose>
                  <Button type="submit" disabled={addWord.isPending}  className="cursor-pointer">Save Changes</Button>
              </DialogFooter>
          </form>
            </DialogContent>
        </Form>
      </Dialog>

      <Toaster/>
    </div>
  )
}
