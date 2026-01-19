"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { useProjects } from "@/app/contexts/useProjects";
import Typewriter from "typewriter-effect";
import AnimatedNumbers from "react-animated-numbers";
import gsap from "gsap";

export function Hero() {
  const { projects } = useProjects();
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const primaryTextRef = useRef<HTMLSpanElement>(null);
  const secondaryTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const primaryBtn = primaryBtnRef.current;
    const secondaryBtn = secondaryBtnRef.current;
    const primaryText = primaryTextRef.current;
    const secondaryText = secondaryTextRef.current;

    if (!primaryBtn || !secondaryBtn) return;

    const setupMagneticButton = (
      btn: HTMLElement,
      textEl: HTMLElement | null,
    ) => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: "power3.out",
        });

        if (textEl) {
          gsap.to(textEl, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.4,
            ease: "power3.out",
          });
        }
      };

      const handleMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.15,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "elastic.out(1.2, 0.4)",
        });

        if (textEl) {
          gsap.to(textEl, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1.2, 0.4)",
          });
        }
      };

      const handleMouseDown = () => {
        gsap.to(btn, {
          scale: 0.9,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      const handleMouseUp = () => {
        gsap.to(btn, {
          scale: 1.15,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener("mousemove", handleMouseMove);
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);
      btn.addEventListener("mousedown", handleMouseDown);
      btn.addEventListener("mouseup", handleMouseUp);

      return () => {
        btn.removeEventListener("mousemove", handleMouseMove);
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
        btn.removeEventListener("mousedown", handleMouseDown);
        btn.removeEventListener("mouseup", handleMouseUp);
      };
    };

    const cleanupPrimary = setupMagneticButton(primaryBtn, primaryText);
    const cleanupSecondary = setupMagneticButton(secondaryBtn, secondaryText);

    return () => {
      cleanupPrimary();
      cleanupSecondary();
    };
  }, []);

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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              ref={primaryBtnRef}
              href="#contacto"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden cursor-pointer"
              style={{ willChange: "transform" }}
            >
              <span
                ref={primaryTextRef}
                className="relative z-10 flex items-center gap-2"
              >
                Comenzar Proyecto
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>

            <a
              ref={secondaryBtnRef}
              href="#proyectos"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-foreground/20 text-foreground font-semibold rounded-full overflow-hidden cursor-pointer hover:border-primary/50"
              style={{ willChange: "transform" }}
            >
              <span ref={secondaryTextRef} className="relative z-10">
                Ver Proyectos
              </span>
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
