"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useProjects } from "@/app/contexts/useProjects";
import Typewriter from "typewriter-effect";
import AnimatedNumbers from "react-animated-numbers";
import { MouseEffect } from "./ui/mouse-effect";

export function Hero() {
  const { projects } = useProjects();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center pt-16"
    >
      <MouseEffect />
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#contacto"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg overflow-hidden cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Comenzar Proyecto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
              href="#proyectos"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-foreground/20 text-foreground font-semibold rounded-lg overflow-hidden cursor-pointer hover:border-primary/50"
              style={{ willChange: "transform" }}
            >
              <span className="relative z-10">Ver Proyectos</span>
              <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
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
