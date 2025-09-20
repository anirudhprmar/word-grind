'use client';

import Hero from "~/components/Hero";
import Navbar from "../components/Navbar";
import Features from "~/components/Features";
import Demo from "~/components/Demo";
import CTA from "~/components/CTA";
import FAQ from "~/components/FAQ";
import { useEffect, useRef, useState, type RefObject } from "react";
import PricingTable from "./pricing/_component/pricing-table";
import { getSubscriptionDetails } from "~/lib/subscription";
import Footer from "~/components/Footer";

type SubscriptionDetails = {
  id: string;
  productId: string;
  status: string;
  amount: number;
  currency: string;
  recurringInterval: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  organizationId: string | null;
};

interface subDetailsProps{
    hasSubscription: boolean;
  subscription?: SubscriptionDetails;
  error?: string;
  errorType?: "CANCELED" | "EXPIRED" | "GENERAL";
}

export default function Home() {

  const [subDetails,SetSubDetails] = useState<subDetailsProps | null>(null)

  useEffect(()=>{
    let isActive = true
    async function fetchData(){
      const subscriptionDetails = await getSubscriptionDetails()
      if (isActive) SetSubDetails(subscriptionDetails)
    }
    void fetchData()
    return ()=> {isActive = false}
  },[])

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
    <Demo ref={demoRef}/>
    {subDetails &&
    <PricingTable subscriptionDetails={subDetails} ref={pricingRef}/>
    }
    <FAQ/>
    <CTA/>
      </main>

    <Footer />
     
    </div>
  );
}
