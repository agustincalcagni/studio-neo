import { Code2, Palette, Rocket, Smartphone, Globe, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description:
      "Sitios web modernos y aplicaciones escalables con las últimas tecnologías.",
  },
  {
    icon: Palette,
    title: "Diseño UI/UX",
    description: "Interfaces intuitivas y experiencias de usuario memorables.",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones nativas y multiplataforma de alto rendimiento.",
  },
  {
    icon: Globe,
    title: "E-Commerce",
    description: "Tiendas online optimizadas para conversión y crecimiento.",
  },
  {
    icon: Rocket,
    title: "Optimización SEO",
    description: "Mejoramos tu visibilidad y posicionamiento en buscadores.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Sitios ultrarrápidos que cargan en menos de 3 segundos.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            ¿Cuáles son nuestros servicios?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Soluciones digitales personalizadas.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ofrecemos una visión integral de servicios dónde combinamos el
            desarrollo de software y el análisis de datos para llevar tu
            presencia digital al siguiente nivel.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="card-bg text-center backdrop-blur-lg border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 z-10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
