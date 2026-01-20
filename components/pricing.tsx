"use client";

import { Check, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const pricingPlans = [
  {
    name: "Landing Page",
    description: "Ideal para presentar tu negocio o producto",
    price: "350.000",
    currency: "ARS",
    popular: false,
    features: [
      "Diseño personalizado",
      "Responsive (móvil y desktop)",
      "Hasta 5 secciones",
      "Formulario de contacto",
      "Optimización SEO básica",
      "Entrega en 7-10 días",
    ],
  },
  {
    name: "Sitio Web",
    description: "Para empresas que necesitan más presencia",
    price: "450.000",
    currency: "ARS",
    popular: true,
    features: [
      "Todo lo del plan Landing",
      "Hasta 10 páginas",
      "Blog integrado",
      "Panel de administración",
      "Integración con redes sociales",
      "Soporte por 30 días",
      "Entrega en 15-20 días",
    ],
  },
  {
    name: "E-Commerce",
    description: "Tu tienda online completa y funcional",
    price: "1.400.000",
    currency: "ARS",
    popular: false,
    features: [
      "Todo lo del plan Sitio Web",
      "Catálogo de productos",
      "Carrito de compras",
      "Pasarela de pagos",
      "Gestión de inventario",
      "Dashboard de ventas",
      "Soporte por 60 días",
    ],
  },
  {
    name: "A Medida",
    description: "Soluciones personalizadas para tu proyecto",
    price: "Consultar",
    currency: "",
    popular: false,
    features: [
      "Análisis de requerimientos",
      "Arquitectura personalizada",
      "Desarrollo full stack",
      "APIs e integraciones",
      "Testing y QA",
      "Mantenimiento continuo",
      "Soporte dedicado",
    ],
  },
];

export function Pricing() {
  const popularBtnRef = useRef<HTMLAnchorElement>(null);
  const popularTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = popularBtnRef.current;
    const textEl = popularTextRef.current;

    if (!btn) return;

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
        scale: 1.1,
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
        scale: 1.1,
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
  }, []);

  return (
    <section id="precios" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Planes y Precios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Soluciones para cada necesidad
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Elige el plan que mejor se adapte a tu proyecto. Todos incluyen
            diseño moderno, código limpio y soporte personalizado.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative backdrop-blur-lg border-border hover:border-primary/50 transition-all duration-300 group ${
                plan.popular
                  ? "border-primary bg-primary/5 scale-105 lg:scale-110"
                  : "bg-card/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    Más Popular
                  </span>
                </div>
              )}
              <CardContent className="p-6 flex flex-col h-full">
                {/* Plan Name */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.currency && (
                      <span className="text-muted-foreground text-lg">$</span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.currency && (
                      <span className="text-muted-foreground text-sm">
                        {plan.currency}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                {plan.popular ? (
                  <a
                    ref={popularBtnRef}
                    href="#contacto"
                    className="group relative inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md overflow-hidden cursor-pointer"
                    style={{ willChange: "transform" }}
                  >
                    <span ref={popularTextRef} className="relative z-10">
                      Comenzar
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </a>
                ) : (
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center w-full px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-primary transition-colors"
                  >
                    {plan.price === "Consultar" ? "Contactar" : "Comenzar"}
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-muted-foreground text-sm mt-12">
          ¿Tienes un proyecto especial?{" "}
          <a href="#contacto" className="text-primary hover:underline">
            Contáctanos
          </a>{" "}
          y te hacemos un presupuesto personalizado.
        </p>
      </div>
    </section>
  );
}
