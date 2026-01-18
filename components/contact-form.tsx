"use client";

import type React from "react";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getSupabase } from "@/lib/supabase";
import styles from "../components/styles/contact-form.module.css";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Save to Supabase
    const supabase = getSupabase();
    const { error } = await supabase.from("contact_leads").insert([
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
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
    } else {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contacto" className={`py-24 relative ${styles.contact}`}>
      <div className="container mx-auto px-4">
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

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-4 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>
                  Mensaje enviado correctamente. Te contactaremos pronto.
                </span>
              </div>
            )}

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
