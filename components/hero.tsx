"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/app/contexts/useProjects";
import Typewriter from "typewriter-effect";
import AnimatedNumbers from "react-animated-numbers";

export function Hero() {
  const { projects } = useProjects();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      {/* Aurora Background Effect */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/70 rounded-full blur-[120px] animate-aurora " />
      <div
        className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/60 rounded-full blur-[100px] animate-aurora"
        style={{ animationDelay: "-4s" }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="container mx-auto px-4 relative z-10 ">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mt-8 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Desarrollo Web
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 md:leading-20 text-balance">
            Te ayudamos a transformar tus ideas y necesidades en
            <span className="text-primary">
              <Typewriter
                options={{
                  strings: [
                    "apps.",
                    "páginas web.",
                    "e-commerce.",
                    "soluciones de software.",
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </span>{" "}
          </h1>

          {/* Subheading */}
          {/* <div className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Sitios web y aplicaciones totalmente personalizables y a medida para
            llevar tu{" "}
            <span className="text-primary inline-flex">
              <Typewriter
                options={{
                  strings: ["negocio", "empresa", "marca", "presencia"],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </span>
            al siguiente nivel.
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#contacto" className="gap-2">
                Comenzar Proyecto
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#proyectos">Ver Proyectos</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                <AnimatedNumbers animateToNumber={projects.length} />
                <span className="text-primary">+</span>
              </div>
              <div className="text-sm text-muted-foreground">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                <AnimatedNumbers animateToNumber={99} />
                <span className="text-primary">%</span>
              </div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                <AnimatedNumbers animateToNumber={3} />
                <span className="text-primary">+</span>
              </div>
              <div className="text-sm text-muted-foreground">Años</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
