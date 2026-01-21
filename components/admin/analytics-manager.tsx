"use client";

import { useCallback, useEffect, useState } from "react";
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
  Tablet,
  FileText,
  ArrowUpRight,
} from "lucide-react";

// Datos de ejemplo hardcodeados
const mockData = {
  totals: {
    pageViews: 12847,
    visitors: 3521,
    bounceRate: 42.5,
    avgDuration: 185, // segundos
  },
  pages: [
    { key: "/", total: 4521 },
    { key: "/servicios", total: 1876 },
    { key: "/contacto", total: 1543 },
  ],
  countries: [
    { key: "AR", total: 2145 },
    { key: "MX", total: 543 },
    { key: "ES", total: 421 },
  ],
  devices: {
    desktop: 2105,
    mobile: 1254,
    tablet: 162,
  },
  referrers: [
    { key: "google.com", total: 1823 },
    { key: "Directo", total: 987 },
    { key: "instagram.com", total: 432 },
    { key: "linkedin.com", total: 234 },
    { key: "twitter.com", total: 156 },
    { key: "facebook.com", total: 98 },
  ],
};

const countryNames: Record<string, string> = {
  AR: "🇦🇷 Argentina",
  US: "🇺🇸 Estados Unidos",
  ES: "🇪🇸 España",
  MX: "🇲🇽 México",
  CO: "🇨🇴 Colombia",
  CL: "🇨🇱 Chile",
  PE: "🇵🇪 Perú",
  BR: "🇧🇷 Brasil",
  UY: "🇺🇾 Uruguay",
  EC: "🇪🇨 Ecuador",
  GB: "🇬🇧 Reino Unido",
  DE: "🇩🇪 Alemania",
  FR: "🇫🇷 Francia",
  IT: "🇮🇹 Italia",
};

export function AnalyticsManager() {
  const [timeframe, setTimeframe] = useState("7d");
  const [loading, setLoading] = useState(false);
  const data = mockData;

  const handleRefresh = () => {
    setLoading(true);
    // Simular carga
    setTimeout(() => setLoading(false), 1000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getCountryName = (code: string) => {
    return countryNames[code] || `🌍 ${code}`;
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    subtitle,
  }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    subtitle?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
          <p className="text-muted-foreground">Estadísticas de tu sitio web</p>
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
              <SelectItem value="90d">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vistas Totales"
          value={formatNumber(data.totals.pageViews)}
          icon={Eye}
        />
        <StatCard
          title="Visitantes Únicos"
          value={formatNumber(data.totals.visitors)}
          icon={Users}
        />
        <StatCard
          title="Tasa de Rebote"
          value={`${data.totals.bounceRate.toFixed(1)}%`}
          icon={TrendingUp}
        />
        <StatCard
          title="Duración Promedio"
          value={formatDuration(data.totals.avgDuration)}
          icon={BarChart3}
        />
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="w-4 h-4 text-blue-500" />
              Páginas Más Visitadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.pages.map((page, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-sm truncate flex-1 mr-2">
                    {page.key === "/" ? "Inicio" : page.key}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {formatNumber(page.total)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Globe className="w-4 h-4 text-green-500" />
              Países
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.countries.map((country, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-sm">{getCountryName(country.key)}</span>
                  <span className="text-sm font-medium text-primary">
                    {formatNumber(country.total)}
                  </span>
                </div>
              ))}
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
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  icon: Monitor,
                  label: "Desktop",
                  value: data.devices.desktop,
                },
                {
                  icon: Smartphone,
                  label: "Mobile",
                  value: data.devices.mobile,
                },
                { icon: Tablet, label: "Tablet", value: data.devices.tablet },
              ].map((device, i) => {
                const total =
                  data.devices.desktop +
                  data.devices.mobile +
                  data.devices.tablet;
                const percentage = total > 0 ? (device.value / total) * 100 : 0;

                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <device.icon className="w-4 h-4" />
                        {device.label}
                      </span>
                      <span className="text-sm font-medium">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Referrers */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ArrowUpRight className="w-4 h-4 text-orange-500" />
              Fuentes de Tráfico
            </CardTitle>
            <CardDescription>De dónde vienen tus visitantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {data.referrers.map((ref, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <p className="text-sm font-medium truncate">{ref.key}</p>
                  <p className="text-lg font-bold text-primary">
                    {formatNumber(ref.total)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
