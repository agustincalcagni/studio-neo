"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/app/contexts/useProjects";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";

export function Projects() {
  const { projects, isLoading } = useProjects();

  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

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

        {/* Projects Grid Skelleton */}
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
          <div>
            <Swiper
              onSwiper={setSwiperRef}
              slidesPerView={1}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full !overflow-visible"
              style={{
                width: "100%",
              }}
            >
              {featuredProjects && featuredProjects.length > 0 ? (
                featuredProjects.map((project) => (
                  <SwiperSlide key={project.id}>
                    <Link
                      href={`/project/${project.id}`}
                      key={project.id}
                      className="bg-card/50 border border-border rounded-xl transition-all duration-300 group overflow-hidden"
                    >
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
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="text-sm font-semibold font-mono uppercase flex gap-3 items-center text-foreground mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            fill="none"
                            className="-translate-y-[1px]"
                          >
                            <path fill="#FF3621" d="m12 7-9 5.196V1.804z" />
                          </svg>
                          {project.title}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.split(",").map((tag) => (
                            <span key={tag} className="text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div>No hay productos cargados aún.</div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => swiperRef?.slidePrev()}
                className="w-10 h-10 border rounded-md border-border flex items-center justify-center hover:bg-blue-950/50 hover:text-white transition-all duration-200"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => swiperRef?.slideNext()}
                className="w-10 h-10 border rounded-md border-border flex items-center justify-center hover:bg-blue-950/50 hover:text-white transition-all duration-200"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
