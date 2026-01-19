"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#precios", label: "Precios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuIsOpen = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-slate-800 shadow-2xl shadow-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              className="bg-transparent"
              src="/logo.png"
              width={45}
              height={45}
              alt=""
            />
            <span className="font-bold text-xl text-foreground">
              Studio
              <span className="bg-clip-text text-transparent bg-linear-120 from-blue-400 via-blue-600 to-blue-700">
                Neo
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <a href="#contacto">Comenzar Proyecto</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={handleMenuIsOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-border h-dvh items-center grid">
            <div className="flex flex-col text-center gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-2xl font-medium py-2"
                  onClick={handleMenuIsOpen}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 text-2xl">
                <a href="#contacto" onClick={handleMenuIsOpen}>
                  Comenzar Proyecto
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
