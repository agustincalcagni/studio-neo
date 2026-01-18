import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Projects } from "@/components/projects";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <ContactForm />
      <Footer />
    </main>
  );
}
