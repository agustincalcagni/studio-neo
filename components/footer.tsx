import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
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
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StudioNeo. Todos los derechos
              reservados.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
