import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export const useMouse = (): MousePosition => {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return { x: position.x, y: position.y };
};
