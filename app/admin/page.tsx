import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase-server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return <AdminDashboard user={user} />
}
