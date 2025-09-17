import Link from "next/link";
import { Button } from "~/components/ui/button";
import {  isUserSubscribed } from "~/lib/subscription";
import WordSearchInput from "../_components/WordSearchInput";
import { Input } from "~/components/ui/input";

export default async function Conversation() {
   const userSub = await isUserSubscribed();

  return (
    <div>

       {!userSub ? (
                          <>
                            <div className="absolute inset-0 z-10 rounded-lg  flex items-center justify-center">
                              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center max-w-md">
                                <h3 className="text-xl font-semibold mb-2">
                                  Subscription Required
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                  You need an active subscription to access payment management
                                  features.
                                </p>
                                <Link href="/pricing">
                                  <Button>Subscribe Now</Button>
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
      <div className="min-h-full relative ">

        <div className=" absolute inset-0 z-10 rounded-lg top-20 flex items-center justify-center">
          <h1 className="text-center text-3xl font-serif pt-5 mt-10 ">🔒 Coming Soon</h1>
        </div>
         <div className="blur-sm pointer-events-none max-w-full mx-40 min-h-full ">
          
          <div className="text-center pt-10">
            <h2 className="text-4xl  font-serif">Let&apos;s Have a Conversation</h2>
          </div>

          <div className="mt-10 p-2 mx-auto min-w-full lg:min-w-150">
              <WordSearchInput userId=""/>
          </div>
          
          <div>
            {/* recommendation for conversation : 2 types -> normal random conversation and other will be word specific conversation*/}
            <div className="text-center pt-10">
              <h3 className="text-xl  font-serif">Try having a conversation with:</h3>

              <div className="flex justify-center gap-5 pt-5">
              <p className="text-md italic text-gray-500 mt-2 bg-accent rounded-xl p-2 cursor-pointer">Beautiful</p>
              <p className="text-md italic text-gray-500 mt-2 bg-accent rounded-xl p-2 cursor-pointer">Jargon</p>
              <p className="text-md italic text-gray-500 mt-2 bg-accent rounded-xl p-2 cursor-pointer">Eneffable</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      )}
    </div>
  )
}
