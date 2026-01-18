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
          <Link href="/" className="flex items-center justify-center mr-16">
            <Image
              src="/logo-header.png"
              width={220}
              height={60}
              className="object-cover translate-1.5"
              alt="Logo Neo Studio"
            />
            <h1 className="text-xl font-bold text-foreground">Admin</h1>
          </Link>
          <p className="text-muted-foreground mt-2">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
