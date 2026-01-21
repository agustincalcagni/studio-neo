"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Calendar,
  Trash2,
  RefreshCw,
  Inbox,
  MailCheck,
  MailOpen,
  ArrowLeft,
  MapPin,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeads } from "@/app/contexts/useLeads";
import { closeDialog, showDialog } from "../showDialog";
import { ContactLead } from "@/lib/supabase";
import { formatDate } from "@/app/utils/formatDate";
import { toast } from "sonner";

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
          <div className="flex justify-center mx-auto gap-4 my-2">
            <button
              className="px-6 py-2  border border-zinc-border rounded-md bg-red-400/70 active:scale-90 hover:opacity-90 hover:outline-offset-1 hover:outline-1 hover:outline-zinc-600"
              onClick={() => {
                deleteLead(id);
                closeDialog();
                toast.error("Mensaje eliminado correctamente");
              }}
            >
              Aceptar
            </button>
            <button
              className="px-6 py-2 border border-zinc-border rounded-md bg-zinc-700/50 active:scale-90 hover:opacity-90 hover:outline-offset-1 hover:outline-1 hover:outline-zinc-600"
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
      <div className="space-y-4 sm:space-y-6">
        <Button
          onClick={() => setSelectedLead(null)}
          variant="outline"
          className="w-full sm:w-auto"
        >
          <ArrowLeft />
          Volver
        </Button>
        <article className="gmail-lead-article bg-card shadow-sm border p-4 sm:p-6">
          <div className="gmail-lead-header border-b pb-4 mb-4">
            <h2 className="gmail-lead-name text-xl sm:text-2xl font-bold mb-2 break-words">
              {selectedLead.name}
            </h2>
            <div className="gmail-lead-email flex items-start gap-2 text-muted-foreground text-sm">
              <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span className="break-words">
                {selectedLead.email} &mdash; para{" "}
                <span className="text-foreground font-medium">@StudioNeo</span>
              </span>
            </div>
            <div className="gmail-lead-email flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>
                {selectedLead.city}, {selectedLead.country} &mdash;
              </span>
            </div>
          </div>
          <p className="gmail-lead-message whitespace-pre-wrap text-foreground leading-relaxed min-h-[100px] text-sm">
            {selectedLead.message}
          </p>
          <a
            href={`mailto:${selectedLead.email}`}
            target="_blank"
            className="text-primary underline text-xs sm:text-sm"
          >
            Responder
          </a>
          <div className="mt-8 pt-4 flex flex-col border-t text-xs sm:text-sm text-muted-foreground items-start sm:items-center gap-2">
            <p className="flex items-center gap-2 flex-wrap">
              <Globe className="w-4 h-4 flex-shrink-0" />
              Zona horaria: {selectedLead.timezone}
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              Enviado el {formatDate(selectedLead.created_at)} desde{" "}
              <span className="text-primary">{selectedLead.system}</span> con
              IP: <span className="text-primary">{selectedLead.ip}</span>
            </p>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Mensajes de Contacto
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Mensajes recibidos del formulario de contacto
          </p>
        </div>
        <Button
          variant="outline"
          onClick={getLeads}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Actualizar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        <Card className="bg-card/50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {leads.length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Total leads
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                ).length
              }
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Esta semana
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at) >
                    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                ).length
              }
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">
              Este mes
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {
                leads.filter(
                  (l) =>
                    new Date(l.created_at).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Hoy</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      {isLoading ? (
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-3 sm:p-6">
                <div className="h-4 sm:h-5 bg-muted rounded w-1/3 mb-3" />
                <div className="h-3 sm:h-4 bg-muted rounded w-full mb-2" />
                <div className="h-3 sm:h-4 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : leads.length === 0 ? (
        <Card className="bg-card/50">
          <CardContent className="p-12 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No hay mensajes
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Los mensajes del formulario de contacto aparecerán aquí
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="border-t border-border" ref={leadsRef}>
          {leads.map((lead, idx) => (
            <div
              key={lead.id}
              className={`border-b border-border hover:bg-primary/5 transition-colors cursor-pointer ${
                lead.status === false ? "bg-primary/10" : ""
              } ${idx === 0 ? "" : ""}`}
              onClick={() => handleClik(lead)}
            >
              {/* Vista Móvil */}
              <div className="sm:hidden p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-sm font-semibold truncate ${
                        lead.status === false ? "text-white" : "text-foreground"
                      }`}
                    >
                      {lead.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.email}
                    </p>
                  </div>
                  {lead.status === false && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {lead.message}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(lead.created_at)}</span>
                  <div className="flex gap-1">
                    {lead.status === false ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          markLeadAsRead(lead.id);
                          toast.info("Se marcó el mesaje como leído.");
                        }}
                      >
                        <Mail size={16} />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          markLeadAsNotRead(lead.id);
                          toast.info("Se marcó el mensaje como no leído.");
                        }}
                      >
                        <MailOpen size={16} />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lead.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Vista Desktop */}
              <div className="hidden sm:block p-6 hover:bg-primary/5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-lg font-semibold hover:text-primary transition-colors ${
                        lead.status === false ? "text-white" : "text-foreground"
                      }`}
                    >
                      {lead.name}
                    </h3>
                    <div
                      className={`flex items-center gap-4 mt-2 text-sm ${
                        lead.status === false
                          ? "text-white"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="flex items-center gap-1 truncate">
                        <Mail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{lead.email}</span>
                      </span>
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        {formatDate(lead.created_at)}
                      </span>
                      {lead.status === true ? (
                        <span className="flex items-center gap-1">
                          <MailCheck className="w-3 h-3" />
                          Leído
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-primary px-3 rounded-full text-xs">
                          <Mail className="w-3 h-3" />
                          Nuevo!
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {lead.status === false ? (
                      <Button
                        title="Marcar mensaje como leído"
                        className="bg-black/25 relative"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markLeadAsRead(lead.id);
                          toast.info("Se marcó el mesaje como leído.");
                        }}
                      >
                        <Mail size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
                      </Button>
                    ) : (
                      <Button
                        title="Marcar copmo no léido"
                        className="bg-black/25"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          markLeadAsNotRead(lead.id);
                          toast.info("Se marcó el mensaje como no leído.");
                        }}
                      >
                        <MailOpen size={20} />
                      </Button>
                    )}
                    <Button
                      className="bg-black/25 group"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lead.id);
                      }}
                    >
                      <Trash2
                        size={20}
                        className="group-hover:text-red-500/80"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
