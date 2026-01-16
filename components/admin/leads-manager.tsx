"use client"

import { useEffect, useState } from "react"
import { Mail, Calendar, Trash2, RefreshCw, Inbox } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabase, type ContactLead } from "@/lib/supabase"

export function LeadsManager() {
  const [leads, setLeads] = useState<ContactLead[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchLeads = async () => {
    setIsLoading(true)
    const supabase = getSupabase()
    const { data, error } = await supabase.from("contact_leads").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching leads:", error)
    } else {
      setLeads(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este lead?")) return

    const supabase = getSupabase()
    const { error } = await supabase.from("contact_leads").delete().eq("id", id)

    if (error) {
      console.error("Error deleting lead:", error)
    } else {
      fetchLeads()
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads de Contacto</h1>
          <p className="text-muted-foreground">Mensajes recibidos del formulario de contacto</p>
        </div>
        <Button variant="outline" onClick={fetchLeads} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Actualizar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total leads</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {leads.filter((l) => new Date(l.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-muted-foreground">Esta semana</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {leads.filter((l) => new Date(l.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-sm text-muted-foreground">Este mes</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">
              {leads.filter((l) => new Date(l.created_at).toDateString() === new Date().toDateString()).length}
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
            <h3 className="text-lg font-medium text-foreground mb-2">No hay leads</h3>
            <p className="text-muted-foreground">Los mensajes del formulario de contacto aparecerán aquí</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="bg-card/50 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
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
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(lead.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">{lead.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
