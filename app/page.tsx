"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { About } from "@/components/about";
import { Marquee } from "@/components/marquee";
import { Pricing } from "@/components/pricing";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Pricing />
      <Marquee />
      <Projects />

      <ContactForm />
      <Footer />
    </main>
  );
}
