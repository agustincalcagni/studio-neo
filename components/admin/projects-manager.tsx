"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, X, Save, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getSupabase, type Project } from "@/lib/supabase"

type ProjectFormData = {
  title: string
  description: string
  image_url: string
  tags: string
  link: string
  featured: boolean
}

const emptyForm: ProjectFormData = {
  title: "",
  description: "",
  image_url: "",
  tags: "",
  link: "",
  featured: true,
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>(emptyForm)
  const [isSaving, setIsSaving] = useState(false)

  const fetchProjects = async () => {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching projects:", error)
    } else {
      setProjects(data || [])
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const openCreateDialog = () => {
    setEditingProject(null)
    setFormData(emptyForm)
    setIsDialogOpen(true)
  }

  const openEditDialog = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url || "",
      tags: project.tags?.join(", ") || "",
      link: project.link || "",
      featured: project.featured,
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const supabase = getSupabase()
    const projectData = {
      title: formData.title,
      description: formData.description,
      image_url: formData.image_url || null,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      link: formData.link || null,
      featured: formData.featured,
    }

    if (editingProject) {
      // Update existing project
      const { error } = await supabase.from("projects").update(projectData).eq("id", editingProject.id)

      if (error) {
        console.error("Error updating project:", error)
      }
    } else {
      // Create new project
      const { error } = await supabase.from("projects").insert([projectData])

      if (error) {
        console.error("Error creating project:", error)
      }
    }

    setIsSaving(false)
    setIsDialogOpen(false)
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return

    const supabase = getSupabase()
    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      console.error("Error deleting project:", error)
    } else {
      fetchProjects()
    }
  }

console.log(projects)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proyectos</h1>
          <p className="text-muted-foreground">Gestiona los proyectos del portafolio</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
              <DialogDescription>
                {editingProject ? "Modifica los datos del proyecto" : "Completa los datos del nuevo proyecto"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Nombre del proyecto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Descripción del proyecto"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL de Imagen</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separados por coma)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="React, Next.js, Tailwind"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="link">Link del proyecto</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Destacado en portafolio</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Projects List */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="bg-card/50">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No hay proyectos</h3>
            <p className="text-muted-foreground mb-4">Crea tu primer proyecto para mostrarlo en el portafolio</p>
            <Button onClick={openCreateDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Crear Proyecto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card/50 border-border">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    {project.featured && (
                      <Badge variant="secondary" className="mt-1">
                        Destacado
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(project)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {/* {project ? project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    )) : null} */}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
