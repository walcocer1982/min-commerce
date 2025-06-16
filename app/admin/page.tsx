import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function AdminPage() {
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

  if (session?.user.role !== "admin") {
    return (
      <main className="flex items-center justify-center min-h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Acceso denegado</CardTitle>
            <CardDescription>No tienes permisos para acceder a esta sección</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Esta página es exclusiva para administradores. Tu rol actual es: 
              <span className="font-medium"> {session?.user.role}</span>
            </p>
            <Link 
              href="/"
              className="text-sm text-blue-500 hover:underline"
            >
              Volver al inicio
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-[80vh] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-gray-500">Bienvenido, {session.user.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Productos</CardTitle>
              <CardDescription>Administra el catálogo de productos</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-blue-500 hover:underline cursor-pointer">Ver todos los productos</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Añadir nuevo producto</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Gestionar inventario</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestión de Pedidos</CardTitle>
              <CardDescription>Administra los pedidos de clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-blue-500 hover:underline cursor-pointer">Pedidos pendientes</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Historial de pedidos</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Configurar envíos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>Administra los usuarios de la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-blue-500 hover:underline cursor-pointer">Ver todos los usuarios</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Asignar roles</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Bloquear usuarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Configuraciones generales del sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="text-blue-500 hover:underline cursor-pointer">Configuración general</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Métodos de pago</li>
                <li className="text-blue-500 hover:underline cursor-pointer">Opciones de envío</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
} 