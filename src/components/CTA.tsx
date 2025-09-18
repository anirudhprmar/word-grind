import Link from "next/link"


export default function CTA() {
  
  return (
    <section className="pt-30 pb-20  mt-30 mx-5 md:mx-10 flex flex-col items-center justify-around gap-5  max-w-full bg-secondary mb-10 rounded-2xl ">
      <div
      className="flex flex-col items-center justify-center gap-5">
        <h6 
        className="font-bold text-2xl md:text-3xl  lg:text-4xl max-w-90 text-center md:max-w-full">Unlock Lasting Vocabulary Mastery with AI

</h6>

        <p className=" text-md md:text-lg text-center lg:text-xl font-semibold text-secondary-foreground">Start saving and mastering words today—turn fleeting searches into lifelong learning!</p>

        <div
        >
        <Link href={'/pricing'} className="p-2 md:p-3 text-lg cursor-pointer  bg-foreground text-primary-foreground w-fit rounded-lg">Get WordGrind</Link>
        </div>
      </div>
    </section>
  )
}

