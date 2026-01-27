import { useMouse } from "@/hooks/use-mouse";
import { useEffect, useState } from "react";

interface TrailProps {
  id: number;
  x: number;
  y: number;
}

export const MouseEffect = () => {
  const { x, y } = useMouse();
  const [trail, setTrail] = useState<TrailProps[]>([]);
  const newTrail = { x, y, id: Date.now() };

  useEffect(() => {
    setTrail((prev) => [...prev.slice(-18), newTrail]);

    const interval = setInterval(() => {
      setTrail((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 500);

    return () => clearInterval(interval);
  }, [setTrail, x, y]);

  return (
    <>
      {trail.map(({ x, y, id }, i) => {
        return (
          <span
            key={id}
            className={`absolute bg-blue-500/30 rounded-full blur-md ${i === 0 ? "w-3 h-3" : "w-4 h-4"}`}
            style={{
              top: y,
              left: x,
            }}
          />
        );
      })}
    </>
  );
};
