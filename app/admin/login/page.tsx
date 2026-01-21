import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase-server";
import { LoginForm } from "@/components/admin/login-form";
import Link from "next/link";
import Image from "next/image";

export default async function LoginPage() {
  const supabase = await getSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <Image
                className="bg-transparent"
                src="/logo.png"
                width={45}
                height={45}
                alt=""
              />
              <div className="flex gap-2 font-bold text-xl text-foreground">
                <span>
                  Studio
                  <span className="bg-clip-text text-transparent bg-linear-120 from-blue-400 via-blue-600 to-blue-700">
                    Neo
                  </span>
                </span>
              </div>
            </Link>
          </div>
          <p className="text-muted-foreground mt-2">
            Ingresa tus credenciales para acceder al panel de admistración
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
