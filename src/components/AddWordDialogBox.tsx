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
meaning:z.string(),
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

  
  const addWord = api.word.addWord.useMutation()


  function onSubmit(values: z.infer<typeof formSchema>) { 

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
    console.log('Transformed payload:', payload)
    addWord.mutate(payload)
    form.reset()
  }

  return (
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
                <div className="grid gap-4">
              
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
                      <Input placeholder="ga rate ness" {...field} />
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
                       <FormLabel>Examples</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <Button type="button" onClick={() => removeExample(index)}>Remove</Button>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" onClick={() => appendExample({value:""})}>Add Example</Button>


               {synonymsFields.map((field, index) => (
                <FormField
                  key={field.id}
                  control={control}
                  name={`synonyms.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="">
                       <FormLabel>Synonyms</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <Button type="button" onClick={() => removeSynonyms(index)}>Remove</Button>
                       <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="button" onClick={() => appendSynonyms({value:""})}>Add Synonyms</Button>

               {addWord.isPending && <p>Adding word...</p>}
              {addWord.isSuccess && <p>Word added!</p>}
              {addWord.isError && <p>Error: {addWord.error.message}</p>}

         </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
                <Button type="submit" disabled={addWord.isPending} >Save Changes</Button>
            </DialogFooter>
        </form>
          </DialogContent>
      </Form>
     </Dialog>
  )
}
