import type React from "react";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectProvider } from "./contexts/useProjects";
import { LeadsProvider } from "./contexts/useLeads";

const _inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudioNeo | Desarrollo Web Premium",
  description:
    "Agencia de desarrollo web que transforma ideas en experiencias digitales excepcionales",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased overflow-x-hidden`}>
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
        <ProjectProvider>
          <LeadsProvider>{children}</LeadsProvider>
        </ProjectProvider>
      </body>
    </html>
  );
}
