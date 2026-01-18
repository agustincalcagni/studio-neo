"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Calendar,
  Trash2,
  RefreshCw,
  Inbox,
  MailCheck,
  MailMinus,
  MailOpen,
  ArrowLeft,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeads } from "@/app/contexts/useLeads";
import { closeDialog, showDialog } from "../showDialog";
import { ContactLead } from "@/lib/supabase";
import { formatDate } from "@/app/utils/formatDate";

export function LeadsManager() {
  const {
    leads,
    getLeads,
    isLoading,
    deleteLead,
    markLeadAsRead,
    markLeadAsNotRead,
  } = useLeads();
  const leadsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getLeads();
  }, []);

  const handleDelete = async (id: string) => {
    showDialog({
      title: "Borrar mensaje",
      content: (
        <div>
          <p>¿Estás seguro de que quieres eliminar este mensaje?</p>
          <div className="flex justify-center mx-auto gap-4 mt-2">
            <button
              className="px-6 py-2  border border-zinc-border rounded-md bg-red-400/70 active:scale-90 hover:opacity-90 hover:outline-offset-1 hover:outline-1 hover:outline-zinc-600"
              onClick={() => {
                deleteLead(id);
                closeDialog();
              }}
            >
              Aceptar
            </button>
            <button
              className="px-6 py-2 border border-zinc-border rounded-md bg-zinc-700 active:scale-90 hover:opacity-90 hover:outline-offset-1 hover:outline-1 hover:outline-zinc-600"
              onClick={() => closeDialog()}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
    });
  };

  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);

  const handleClik = (lead: ContactLead) => {
    markLeadAsRead(lead.id);
    setSelectedLead(lead);
  };

  if (selectedLead) {
    return (
      <div className="space-y-6">
        <Button onClick={() => setSelectedLead(null)} variant="outline">
          <ArrowLeft />
          Volver
        </Button>
        <article className="gmail-lead-article bg-card rounded-lg p-6 shadow-sm border">
          <div className="gmail-lead-header border-b pb-4 mb-4">
            <h2 className="gmail-lead-name text-2xl font-bold mb-2">
              {selectedLead.name}
            </h2>
            <div className="gmail-lead-email flex items-center text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>
                {selectedLead.email} &mdash; para{" "}
                <span className="text-foreground font-medium">@StudioNeo</span>
              </span>
            </div>
          </div>
          <p className="gmail-lead-message whitespace-pre-wrap text-foreground leading-relaxed min-h-[100px]">
            {selectedLead.message}
          </p>
          <div className="mt-8 pt-4 flex justify-between border-t text-sm text-muted-foreground items-center">
            <p className="flex items-center">
              <IdCard className="w-4 h-4 mr-2" />
              Mensaje id: {selectedLead.id}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              Enviado el {formatDate(selectedLead.created_at)}
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Leads de Contacto
          </h1>
          <p className="text-muted-foreground">
            Mensajes recibidos del formulario de contacto
          </p>
        </div>
        <Button variant="outline" onClick={getLeads} disabled={isLoading}>
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {leads.length}
            </div>
            <div className="text-sm text-muted-foreground">Total leads</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Esta semana</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at) >
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Este mes</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
            </div>
            <div className="text-sm text-muted-foreground">Hoy</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-5 bg-muted rounded w-1/3 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : leads.length === 0 ? (
        <Card className="bg-card/50">
          <CardContent className="p-12 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay leads
            </h3>
            <p className="text-muted-foreground">
              Los mensajes del formulario de contacto aparecerán aquí
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="" ref={leadsRef}>
          {leads.map((lead) => (
            <Card
              key={lead.id}
              className={`bg-card/50 rounded-none hover:border-primary hover:bg-primary/5 transition-all ${lead.status === false ? "font-bold bg-primary/10" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle
                      className="text-lg hover:cursor-pointer hover:text-primary"
                      onClick={() => handleClik(lead)}
                    >
                      {lead.name}
                    </CardTitle>
                    <div
                      className={`flex items-center gap-4 mt-1 text-sm ${lead.status === false ? "text-white" : "text-muted-foreground"}`}
                    >
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(lead.created_at)}
                      </span>
                      {lead.status === true ? (
                        <span className="flex items-center gap-1">
                          <MailCheck className="w-3 h-3" />
                          Leído
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-primary px-4 rounded-full">
                          <Mail className="w-3 h-3" />
                          Nuevo!
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 align-center">
                    {lead.status === false ? (
                      <Button
                        title="Marcar mensaje como leído"
                        className="bg-black/25 relative"
                        variant="ghost"
                        size="lg"
                        onClick={() => markLeadAsRead(lead.id)}
                      >
                        <Mail size={24} />
                        <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                      </Button>
                    ) : (
                      <Button
                        title="Marcar copmo no léido"
                        className="bg-black/25"
                        variant="ghost"
                        size="lg"
                        onClick={() => markLeadAsNotRead(lead.id)}
                      >
                        <MailOpen size={24} />
                      </Button>
                    )}
                    <Button
                      className="bg-black/25 group"
                      variant="ghost"
                      size="lg"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2
                        size={24}
                        className=" group-hover:text-red-500/80"
                      />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
