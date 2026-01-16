import { redirect } from "next/navigation"
import { getSupabaseServer } from "@/lib/supabase-server"
import { LoginForm } from "@/components/admin/login-form"

export default async function LoginPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">SN</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin StudioNeo</h1>
          <p className="text-muted-foreground mt-2">Ingresa tus credenciales para acceder</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
