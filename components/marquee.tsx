"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const rollingWords = [
  "Desarrollo Web",
  "Apps Full Stack",
  "E-commerce",
  "Soluciones Digitales",
  "UX/UI Design",
  "Sistemas a Medida",
];

export const Marquee = () => {
  const rollingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rollingRef.current) {
      gsap.to(rollingRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });
    }
  }, []);

  return (
    <div className="w-full overflow-hidden py-6 bg-primary/10 border-dashed border-y border-primary/20">
      <div ref={rollingRef} className="flex whitespace-nowrap">
        {[
          ...rollingWords,
          ...rollingWords,
          ...rollingWords,
          ...rollingWords,
        ].map((word, i) => (
          <span
            key={i}
            className="text-primary/70 text-xl md:text-2xl font-bold mx-8 uppercase tracking-wider"
          >
            {word} •
          </span>
        ))}
      </div>
    </div>
  );
};
