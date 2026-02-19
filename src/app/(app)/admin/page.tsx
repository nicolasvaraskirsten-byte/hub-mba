import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, UserCheck, Calendar, FileText } from "lucide-react";
import { getAdminMetrics } from "@/lib/data/admin";

export default async function AdminDashboardPage() {
  const metrics = await getAdminMetrics();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
        Admin
      </h1>
      <p className="text-muted-foreground mt-2">
        Gestión de expertos, perfiles, eventos y recursos.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Nuevos miembros (7 días)
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.newMembersWeek}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Solicitudes enviadas
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.bookingsRequested}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <UserCheck className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Sesiones confirmadas
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.bookingsAccepted}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Expertos
            </span>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.expertsCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/admin/expertos">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow w-56 cursor-pointer">
            <CardContent className="pt-6">
              <p className="font-semibold">Gestionar expertos</p>
              <p className="text-sm text-muted-foreground mt-1">
                CRUD y destacar expertos
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/perfiles">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow w-56 cursor-pointer">
            <CardContent className="pt-6">
              <p className="font-semibold">Aprobar perfiles</p>
              <p className="text-sm text-muted-foreground mt-1">
                Publicar u ocultar perfiles
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/eventos">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow w-56 cursor-pointer">
            <CardContent className="pt-6">
              <p className="font-semibold">Eventos</p>
              <p className="text-sm text-muted-foreground mt-1">
                Crear y editar eventos
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/recursos">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow w-56 cursor-pointer">
            <CardContent className="pt-6">
              <p className="font-semibold">Recursos</p>
              <p className="text-sm text-muted-foreground mt-1">
                Crear y editar recursos
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
