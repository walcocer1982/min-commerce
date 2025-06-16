import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex items-center justify-center min-h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">No autorizado</CardTitle>
            <CardDescription>Debes iniciar sesión para ver esta página</CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  console.log("ROL:", session?.user?.role)

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Perfil del Usuario</CardTitle>
          <CardDescription>Información de tu cuenta</CardDescription>
          {session.user?.image && (
            <div className="mt-4 relative w-24 h-24 rounded-full overflow-hidden">
              <Image 
                src={session.user.image}
                alt={session.user.name || "Foto de perfil"}
                fill
                className="object-cover"
              />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-gray-500">Nombre</h3>
              <p className="text-lg">{session.user?.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Email</h3>
              <p className="text-lg">{session.user?.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">ID</h3>
              <p className="text-lg">{session.user?.id}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500">Rol</h3>
              <p className="text-lg capitalize">{session.user?.role || "usuario"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 