"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Title reveal animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      );
    }

    // Typewriter effect for paragraph
    if (paragraphRef.current) {
      const text = paragraphRef.current.innerText;
      paragraphRef.current.innerText = "";
      paragraphRef.current.style.visibility = "visible";

      gsap.to(paragraphRef.current, {
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 75%",
          onEnter: () => {
            let i = 0;
            const speed = 10; // ms por caracter
            const typeWriter = () => {
              if (i < text.length && paragraphRef.current) {
                paragraphRef.current.innerHTML = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, speed);
              }
            };
            typeWriter();
          },
          once: true,
        },
      });
    }
  }, []);

  return (
    <section id="acerca" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section About */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
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
          <p 
            ref={paragraphRef}
            className="text-justify max-w-3xl mx-auto text-pretty text-shadow-white text-shadow-3xl"
            style={{ visibility: "hidden" }}
          >
            Somos un estudio de desarrollo de software y soluciones digitales,
            especializado en la creación de aplicaciones web modernas, sistemas
            a medida y soluciones tecnológicas orientadas a resultados reales.
            Estamos ubicados en San Luis, Argentina, y trabajamos tanto a nivel
            local como internacional. Nos especializamos en desarrollo web moderno, aplicaciones full
            stack, paneles de administración, plataformas e-commerce y
            soluciones basadas en datos, utilizando buenas prácticas y
            tecnologías actuales. Combinamos desarrollo, análisis y visión técnica integral para crear
            productos funcionales, escalables que estén alineados a los
            objetivos de cada proyecto. Le damos prioridad a la calidad, la
            comunicación y los resultados, acompañando a nuestros clientes en
            cada etapa del desarrollo.
          </p>
        </div>
      </div>
    </section>
  );
};
