export const About = () => {
  return (
    <section id="acerca" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section About */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            ¿Quiénes somos?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Sobre Nosotros
          </h2>
          <p className="text-justify max-w-3xl mx-auto text-pretty text-shadow-white text-shadow-3xl">
            Somos un estudio de desarrollo de software y soluciones digitales,
            especializado en la creación de aplicaciones web modernas, sistemas
            a medida y soluciones tecnológicas orientadas a resultados reales.
            Estamos ubicados en San Luis, Argentina, y trabajamos tanto a nivel
            local como internacional.
            <br /> <br />
            Nos especializamos en desarrollo web moderno, aplicaciones full
            stack, paneles de administración, plataformas e-commerce y
            soluciones basadas en datos, utilizando buenas prácticas y
            tecnologías actuales.
            <br /> <br />
            Combinamos desarrollo, análisis y visión técnica integral para crear
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
