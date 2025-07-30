import { Button } from "./ui/button";


export default function CTA() {
  return (
    <section className="min-h-100 flex flex-col items-center justify-around gap-5 ">
      <div className="flex flex-col items-center justify-center gap-5">
        <h6 className="font-bold text-4xl">Ready to transform your vocabulary?</h6>
        <Button variant={'default'} size={'lg'} className="p-3 text-xl cursor-pointer  bg-green-800 text-white w-fit rounded-lg">Get Vocab Builder</Button>
      </div>
    </section>
  )
}

