export const About = () => {
  return (
    <section id="acerca" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section About */}
        <div className="text-justify-left mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            ¿Quiénes somos?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Sobre Nosotros
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Somos un estudio de desarrollo de software y soluciones digitales
            con base en San Luis, Argentina, especializado en la creación de
            aplicaciones web modernas, sistemas a medida y soluciones
            tecnológicas orientadas a resultados reales.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Combinamos desarrollo full stack, análisis de datos y experiencia
            técnica en infraestructura para ofrecer productos sólidos,
            escalables y alineados a las necesidades de cada negocio. A esto se
            suma una fuerte capacidad analítica para transformar datos en
            información clara, útil y accionable mediante dashboards, reportes y
            visualizaciones.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Contamos con experiencia trabajando en proyectos propios y
            soluciones entregadas a clientes reales, tanto a nivel local como
            internacional, acompañando a emprendedores, pymes y organizaciones
            en su proceso de digitalización, optimización de procesos y toma de
            decisiones. Nuestro trabajo no se limita al código: entendemos el
            contexto del negocio, analizamos el problema y diseñamos soluciones
            prácticas, seguras y sostenibles en el tiempo. Esto se traduce en
            desarrollos más confiables, eficientes y preparados para escalar.
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty text-justify">
            Creemos en la mejora continua, la comunicación clara y el compromiso
            con cada proyecto. Trabajamos de forma cercana con nuestros
            clientes, priorizando la calidad, la transparencia y el impacto real
            de cada solución tecnológica.
          </p>
        </div>
      </div>
    </section>
  );
};
