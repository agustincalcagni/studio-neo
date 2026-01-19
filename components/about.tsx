"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del badge
      gsap.from(".about-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Animación del título
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Animación de los párrafos (stagger)
      if (paragraphsRef.current) {
        const paragraphs = paragraphsRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.2,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="acerca"
      className="py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="about-badge text-primary text-sm font-semibold tracking-wider uppercase">
            ¿Quiénes somos?
          </span>
          <h2
            ref={titleRef}
            className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance"
          >
            Sobre Studio
            <span className="bg-clip-text text-transparent bg-linear-120 from-blue-400 via-blue-600 to-blue-700">
              Neo
            </span>
          </h2>
          <div ref={paragraphsRef}>
            <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
              Somos un estudio de desarrollo de software y soluciones digitales,
              especializado en la creación de aplicaciones web modernas,
              sistemas a medida y soluciones tecnológicas orientadas a
              resultados reales. Estamos ubicados en San Luis, Argentina, y
              trabajamos tanto a nivel local como internacional.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto text-pretty mt-4">
              Nos especializamos en desarrollo web moderno, aplicaciones full
              stack, paneles de administración, plataformas e-commerce y
              soluciones basadas en datos, utilizando buenas prácticas y
              tecnologías actuales.
            </p>
            <p className="text-muted-foreground max-w-3xl mx-auto text-pretty mt-4">
              Combinamos desarrollo, análisis y visión técnica integral para
              crear productos funcionales, escalables que estén alineados a los
              objetivos de cada proyecto. Le damos prioridad a la calidad, la
              comunicación y los resultados, acompañando a nuestros clientes en
              cada etapa del desarrollo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
