"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Clock,
  Globe,
  ExternalLink,
  Activity,
} from "lucide-react";

export function AnalyticsManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-muted-foreground">
            Estadísticas de tu sitio web en tiempo real
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.open("https://vercel.com/analytics", "_blank")}
          className="gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Ver en Vercel
        </Button>
      </div>

      {/* Info Card */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Vercel Analytics Activo
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Las métricas de tu sitio se están recopilando automáticamente.
                Los datos detallados están disponibles en el dashboard de
                Vercel.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                  ● Tracking Activo
                </span>
                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-500 rounded-full">
                  Speed Insights Habilitado
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Vistas Totales
            </CardTitle>
            <Eye className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Ver en dashboard de Vercel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visitantes Únicos
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Ver en dashboard de Vercel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tiempo Promedio
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Ver en dashboard de Vercel
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Países
            </CardTitle>
            <Globe className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Ver en dashboard de Vercel
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Web Analytics
            </CardTitle>
            <CardDescription>
              Métricas de audiencia y comportamiento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Page Views & Visitantes únicos</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Países y ciudades de origen</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Dispositivos y navegadores</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Top páginas y referrers</span>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() =>
                window.open(
                  "https://vercel.com/agustincalcagni/studio-neo/analytics",
                  "_blank",
                )
              }
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Analytics Completo
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Speed Insights
            </CardTitle>
            <CardDescription>
              Métricas de rendimiento y velocidad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">First Contentful Paint (FCP)</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Largest Contentful Paint (LCP)</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Cumulative Layout Shift (CLS)</span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm">Interaction to Next Paint (INP)</span>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() =>
                window.open(
                  "https://vercel.com/agustincalcagni/studio-neo/speed-insights",
                  "_blank",
                )
              }
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Ver Speed Insights
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-foreground mb-2">
              ¿Necesitás más métricas?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Vercel Analytics ofrece un plan gratuito con todas las
              funcionalidades básicas. Para métricas avanzadas, considerá el
              plan Pro.
            </p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  window.open("https://vercel.com/docs/analytics", "_blank")
                }
              >
                Ver Documentación
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    "https://vercel.com/agustincalcagni/studio-neo",
                    "_blank",
                  )
                }
              >
                Ir al Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
