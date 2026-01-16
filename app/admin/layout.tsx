import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin | StudioNeo",
  description: "Panel de administración de StudioNeo",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background">{children}</div>
}
