"use client"

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useCallback, useEffect, useState } from "react";

export function Hero() {
//   const [text, setText] = useState<string>();

//   const machineWriter = useCallback((text: string) => {
//     let i = 0;
//     const interval = setInterval(() => {
//       console.log(text[i]);
//       i++;

//       if (text.length >= i) {
//         return clearInterval(interval);
//       }
//     }, 100);
//   }, []);

// useEffect(() => {
//   machineWriter("negocio")
// })


  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-aurora" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] animate-aurora"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mt-8 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">
              Desarrollo Web Premium
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
            Transformamos ideas en{" "}
            <span className="text-primary">productos de software</span>{" "}
            personalizados.
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Creamos sitios web y aplicaciones totalmente personalizables y a
            medida para llevar tu negocio al siguiente nivel.
          </p>
          {/* la palabra que debería borrarse y reescribirse es "negocio" y las variables podrían ser "empresa", "marca", o "presencia digital" */}

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
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                50+
              </div>
              <div className="text-sm text-muted-foreground">Proyectos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                98%
              </div>
              <div className="text-sm text-muted-foreground">Satisfacción</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-foreground">
                5+
              </div>
              <div className="text-sm text-muted-foreground">Años</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
