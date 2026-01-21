"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  Globe,
  RefreshCw,
  Monitor,
  Smartphone,
  MapPin,
  Chrome,
} from "lucide-react";
import { SnVisitorsProps } from "@/app/types/definitions";

// Mapeo de banderas por país
const countryFlags: Record<string, string> = {
  Argentina: "AR",
  "Estados Unidos": "US",
  USA: "US",
  España: "ES",
  Mexico: "MX",
  México: "MX",
  Colombia: "CO",
  Chile: "CL",
  Peru: "PE",
  Perú: "PE",
  Brasil: "BR",
  Brazil: "BR",
  Uruguay: "UY",
  Chicago: "US",
};

// Función para obtener emoji de bandera
const getFlag = (code: string) => {
  const flags: Record<string, string> = {
    AR: "🇦🇷",
    US: "🇺🇸",
    ES: "🇪🇸",
    MX: "🇲🇽",
    CO: "🇨🇴",
    CL: "🇨🇱",
    PE: "🇵🇪",
    BR: "🇧🇷",
    UY: "🇺🇾",
  };
  return flags[code] || "🌍";
};

export function AnalyticsManager() {
  const [timeframe, setTimeframe] = useState("all");
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState<SnVisitorsProps[]>([]);

  const getVisitors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/visitors");
      const data = await res.json();
      if (data.data) {
        setVisitors(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVisitors();
  }, []);

  // Calcular estadísticas basadas en datos reales
  const stats = useMemo(() => {
    if (visitors.length === 0) {
      return {
        totalViews: 0,
        uniqueVisitors: 0,
        countries: [] as { name: string; flag: string; count: number }[],
        cities: [] as { name: string; country: string; count: number }[],
        devices: { desktop: 0, mobile: 0, other: 0 },
        browsers: [] as { name: string; count: number }[],
        lastVisit: null as Date | null,
      };
    }

    // Total de vistas (el count más alto)
    const totalViews = visitors[0]?.count || visitors.length;

    // Visitantes únicos por IP
    const uniqueIPs = new Set(visitors.map((v) => v.ip));
    const uniqueVisitors = uniqueIPs.size;

    // Agrupar por país
    const countryMap = new Map<string, number>();
    visitors.forEach((v) => {
      const country = v.country || "Desconocido";
      if (country !== "No disponible") {
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      }
    });
    const countries = Array.from(countryMap.entries())
      .map(([name, count]) => ({
        name,
        flag: getFlag(countryFlags[name] || ""),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Agrupar por ciudad
    const cityMap = new Map<string, { country: string; count: number }>();
    visitors.forEach((v) => {
      const city = v.city || "Desconocido";
      if (city !== "No disponible") {
        const existing = cityMap.get(city) || { country: v.country, count: 0 };
        cityMap.set(city, { country: v.country, count: existing.count + 1 });
      }
    });
    const cities = Array.from(cityMap.entries())
      .map(([name, data]) => ({
        name,
        country: data.country,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Dispositivos
    const devices = { desktop: 0, mobile: 0, other: 0 };
    visitors.forEach((v) => {
      const system = (v.system || "").toLowerCase();
      if (
        system.includes("windows") ||
        system.includes("mac") ||
        system.includes("linux")
      ) {
        devices.desktop++;
      } else if (
        system.includes("android") ||
        system.includes("ios") ||
        system.includes("iphone")
      ) {
        devices.mobile++;
      } else {
        devices.other++;
      }
    });

    // Navegadores
    const browserMap = new Map<string, number>();
    visitors.forEach((v) => {
      let browser = v.browser || "Desconocido";
      if (!browser || browser.includes("Not(A:Brand") || browser === "") {
        browser = "Otro";
      }
      browserMap.set(browser, (browserMap.get(browser) || 0) + 1);
    });
    const browsers = Array.from(browserMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Última visita
    const lastVisit = visitors[0] ? new Date(visitors[0].created_at) : null;

    return {
      totalViews,
      uniqueVisitors,
      countries,
      cities,
      devices,
      browsers,
      lastVisit,
    };
  }, [visitors]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const totalDevices =
    stats.devices.desktop + stats.devices.mobile + stats.devices.other;

  const StatCard = ({
    title,
    value,
    icon: Icon,
    subtitle,
    color = "text-muted-foreground",
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    subtitle?: string;
    color?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`w-4 h-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analíticas</h2>
          <p className="text-muted-foreground">
            Estadísticas de tu sitio web en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 días</SelectItem>
              <SelectItem value="30d">Últimos 30 días</SelectItem>
              <SelectItem value="all">Todo</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={getVisitors}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vistas Totales"
          value={formatNumber(stats.totalViews)}
          icon={Eye}
          subtitle={`${visitors.length} registros`}
          color="text-blue-500"
        />
        <StatCard
          title="Visitantes Únicos"
          value={formatNumber(stats.uniqueVisitors)}
          icon={Users}
          subtitle="Por dirección IP"
          color="text-green-500"
        />
        <StatCard
          title="Países"
          value={stats.countries.length}
          icon={Globe}
          subtitle="Ubicaciones diferentes"
          color="text-orange-500"
        />
        <StatCard
          title="Última Visita"
          value={
            stats.lastVisit
              ? stats.lastVisit.toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "short",
                })
              : "-"
          }
          icon={TrendingUp}
          subtitle={
            stats.lastVisit
              ? stats.lastVisit.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""
          }
          color="text-purple-500"
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-4 h-4 text-green-500" />
              Países
            </CardTitle>
            <CardDescription>De dónde vienen tus visitantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.countries.length > 0 ? (
                stats.countries.map((country, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm flex items-center gap-2">
                      <span className="text-lg">{country.flag}</span>
                      {country.name}
                    </span>
                    <span className="text-sm font-medium text-primary">
                      {country.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Sin datos
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Cities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="w-4 h-4 text-red-500" />
              Ciudades
            </CardTitle>
            <CardDescription>Ubicaciones más frecuentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.cities.length > 0 ? (
                stats.cities.map((city, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{city.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {city.country}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {city.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Sin datos
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Monitor className="w-4 h-4 text-purple-500" />
              Dispositivos
            </CardTitle>
            <CardDescription>Tipos de dispositivos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  icon: Monitor,
                  label: "Desktop",
                  value: stats.devices.desktop,
                  color: "bg-blue-500",
                },
                {
                  icon: Smartphone,
                  label: "Mobile",
                  value: stats.devices.mobile,
                  color: "bg-green-500",
                },
                {
                  icon: BarChart3,
                  label: "Otros",
                  value: stats.devices.other,
                  color: "bg-gray-500",
                },
              ].map((device, i) => {
                const percentage =
                  totalDevices > 0 ? (device.value / totalDevices) * 100 : 0;

                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <device.icon className="w-4 h-4" />
                        {device.label}
                      </span>
                      <span className="text-sm font-medium">
                        {device.value} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full ${device.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Browsers */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Chrome className="w-4 h-4 text-orange-500" />
              Navegadores
            </CardTitle>
            <CardDescription>Navegadores más utilizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {stats.browsers.length > 0 ? (
                stats.browsers.map((browser, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors text-center"
                  >
                    <p className="text-sm font-medium truncate">
                      {browser.name}
                    </p>
                    <p className="text-2xl font-bold text-primary mt-1">
                      {browser.count}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4 col-span-full">
                  Sin datos
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Visitors Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4 text-blue-500" />
            Visitas Recientes
          </CardTitle>
          <CardDescription>
            Últimas {Math.min(visitors.length, 10)} visitas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    #
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    País
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    Ciudad
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    Sistema
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    Navegador
                  </th>
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {visitors.slice(0, 10).map((visitor) => (
                  <tr
                    key={visitor.id}
                    className="border-b border-border/50 hover:bg-secondary/20"
                  >
                    <td className="py-2 px-2 text-muted-foreground">
                      {visitor.count}
                    </td>
                    <td className="py-2 px-2">
                      <span className="flex items-center gap-1">
                        {getFlag(countryFlags[visitor.country] || "")}{" "}
                        {visitor.country}
                      </span>
                    </td>
                    <td className="py-2 px-2">{visitor.city || "-"}</td>
                    <td className="py-2 px-2">{visitor.system || "-"}</td>
                    <td className="py-2 px-2">
                      {visitor.browser && !visitor.browser.includes("Not(A:")
                        ? visitor.browser
                        : "-"}
                    </td>
                    <td className="py-2 px-2 text-muted-foreground">
                      {new Date(visitor.created_at).toLocaleDateString(
                        "es-AR",
                        {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visitors.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No hay visitas registradas
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
