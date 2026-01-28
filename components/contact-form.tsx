"use client";

import type React from "react";

import { useCallback, useEffect, useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getSupabase } from "@/lib/supabase";
import { getLocation } from "@/app/utils/getLocation";
import { toast } from "sonner";
import { LocationProps } from "@/app/types/definitions";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<LocationProps>();

  const fetchLocation = useCallback(async () => {
    const data = await getLocation();
    setLocation(data);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Save to Supabase
    const supabase = await getSupabase();
    const { error } = await supabase.from("contact_leads").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        ip: location?.ip,
        city: location?.city.name,
        country: location?.country.name,
        system: location?.sysInfo.system,
        browser: location?.sysInfo.webBrowser.browser,
        browser_version: location?.sysInfo.webBrowser.version,
        timezone: location?.country.timezone,
      },
    ]);

    if (error) {
      console.error("Error saving contact:", error);
      setStatus("error");
      setErrorMessage("Hubo un error al enviar el mensaje. Intenta de nuevo.");

      // Also save to localStorage as backup
      const leads = JSON.parse(localStorage.getItem("studioneo_leads") || "[]");
      leads.push({ ...formData, created_at: new Date().toISOString() });
      localStorage.setItem("studioneo_leads", JSON.stringify(leads));
    }

    setStatus("success");
    toast.info("Se ha enviado tu mensaje, te contactaremos pronto!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contacto" className={`py-24 relative`}>
      <div className="absolute bottom-0 left-5.5 w-52 h-52 bg-blue-950 rotate-120 drop-shadow-2xl drop-shadow-blue-600 blur-md -z-50" />
      <div className="absolute -top-1.50 right-5.5 w-52 h-52 bg-blue-950 rotate-120 drop-shadow-2xl drop-shadow-blue-600 blur-md -z-50" />
      <div className="container mx-auto px-4 z-50">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 text-balance">
              Hablemos de tu proyecto
            </h2>
            <p className="text-muted-foreground text-pretty">
              Cuéntanos tu idea y te ayudaremos a hacerla realidad.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  disabled={status === "loading"}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                  disabled={status === "loading"}
                  className="bg-input border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos sobre tu proyecto..."
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                required
                disabled={status === "loading"}
                className="bg-input border-border resize-none"
              />
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                "Enviando..."
              ) : (
                <>
                  Enviar Mensaje
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
