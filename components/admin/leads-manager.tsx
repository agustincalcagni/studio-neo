"use client";

import { useEffect } from "react";
import {
  Mail,
  Calendar,
  Trash2,
  RefreshCw,
  Inbox,
  MailCheck,
  MailMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLeads } from "@/app/contexts/useLeads";
import { closeDialog, showDialog } from "../showDialog";

export function LeadsManager() {
  const {
    leads,
    getLeads,
    isLoading,
    deleteLead,
    markLeadAsRead,
    markLeadAsNotRead,
  } = useLeads();

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
              className="px-6 py-2  border border-zinc-400 rounded-md hover:border-green-400 active:scale-90"
              onClick={() => deleteLead(id)}
            >
              Aceptar
            </button>
            <button
              className="px-6 py-2 border border-zinc-400 rounded-md hover:border-red-400 active:scale-90"
              onClick={closeDialog}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
    });
    closeDialog();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card
              key={lead.id}
              className={`bg-card/50 border-border hover:border-blue-100 ${lead.status === false ? "font-bold bg-primary/70" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
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
                    </div>
                  </div>
                  <div className="flex gap-2 align-center">
                    {lead.status === false ? (
                      <Button
                        title="Marcar mensaje como leído"
                        className="bg-black/25"
                        variant="ghost"
                        size="lg"
                        onClick={() => markLeadAsRead(lead.id)}
                      >
                        <MailCheck size={24} />
                      </Button>
                    ) : (
                      <Button
                        title="Marcar copmo no léido"
                        className="bg-black/25"
                        variant="ghost"
                        size="lg"
                        onClick={() => markLeadAsNotRead(lead.id)}
                      >
                        <MailMinus size={24} className="text-zinc-600" />
                      </Button>
                    )}
                    <Button
                      className="bg-black/25"
                      variant="ghost"
                      size="lg"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 size={24} className="text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {lead.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
