"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/app/contexts/useProjects";

export function Projects() {
  const { projects, isLoading } = useProjects();

  const featuredProjects = projects.filter(
    (project) => project.featured === true,
  );

  return (
    <section id="proyectos" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Portafolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
            Proyectos destacados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Una selección de nuestros trabajos más recientes y exitosos.
          </p>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 border-border animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="flex gap-2">
                      <div className="h-6 bg-muted rounded w-16" />
                      <div className="h-6 bg-muted rounded w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No hay proyectos disponibles actualmente.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-card/50 border-border transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Project Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={
                        project.image_url ||
                        "/placeholder.svg?height=300&width=500&query=web project"
                      }
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-8 h-8 text-primary" />
                      </a>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {/* {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))} */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
