'use client';

import Hero from "~/components/Hero";
import Navbar from "../components/Navbar";
import Features from "~/components/Features";
import Demo from "~/components/Demo";
import Pricing from "~/components/Pricing";
import CTA from "~/components/CTA";
import Footer from "~/components/Footer";
import FAQ from "~/components/FAQ";

export default function Home() {
//landing page
  return (
    <div className=" min-h-screen">
      
    <Navbar/>

      <main>
    {/* sections components */}
    <Hero/>
    <Features/>
    <Demo/>
    <Pricing/>
    <FAQ/>
    <CTA/>
      </main>

      <footer>
        {/* footer component */}
        <Footer/>
      </footer>
    </div>
  );
}
