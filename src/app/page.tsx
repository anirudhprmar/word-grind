'use client';

import Hero from "~/components/Hero";
import Navbar from "../components/Navbar";
import Features from "~/components/Features";
import Demo from "~/components/Demo";
import Pricing from "~/components/Pricing";
import CTA from "~/components/CTA";
import FAQ from "~/components/FAQ";
import { useRef, type RefObject } from "react";
// import { getSubscriptionDetails } from "~/lib/subscription";

export default function Home() {

  // const subscriptionDetails = await getSubscriptionDetails()

 const featuresRef = useRef<HTMLElement>(null)
  const demoRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  

  const scrollFunction = (ref:RefObject<HTMLElement | null>)=>{
    ref.current?.scrollIntoView({
      behavior:'smooth',
      block:"start"
    })
  }


  return (
    <div className=" min-h-screen">
      
    <Navbar 
    scrollFunction={scrollFunction}

      refs={{
        features:featuresRef,
        demo:demoRef,
        pricing:pricingRef
      }}
      />

      <main>
    <Hero/>
    <Features ref={featuresRef}/>
    {/* <Demo ref={demoRef}/> */}
    <Pricing ref={pricingRef}/> 
    {/* change this pricing with the one i just created */}
    <FAQ/>
    <CTA/>
      </main>

     
    </div>
  );
}
