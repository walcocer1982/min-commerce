import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { JWT } from "next-auth/jwt"

// Tipos para el usuario
declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      image: string | null
      role?: string
    }
  }
}

// Extender el tipo JWT para incluir role
declare module "next-auth/jwt" {
  interface JWT {
    role?: string
  }
}

// Lista de emails de administradores
const ADMIN_EMAILS = ["walther.alcocer@cetemin.edu.pe"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Usar Prisma como adaptador para persistir usuarios
  adapter: PrismaAdapter(prisma),
  
  // Configurar proveedores de autenticación
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Configurar los scopes que necesitamos
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: "select_account"
        }
      }
    })
  ],

  // Páginas personalizadas
  pages: {
    signIn: "/login",
    error: "/login", // Redirigir a la página de login con mensajes de error
  },

  // Configuración de sesión
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
    updateAge: 24 * 60 * 60, // 24 horas
  },

  // Callbacks para personalizar el proceso de autenticación
  callbacks: {
    // Modificar la sesión
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        // Añadir el rol a la sesión
        session.user.role = token.role
      }
      return session
    },

    // Modificar el JWT
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        
        // Para acceder a propiedades dinámicas sin error de tipo
        const userWithRole = user as any;
        
        // Si el usuario tiene un rol en la base de datos, usarlo
        if (userWithRole.role !== undefined) {
          // Convertir a minúsculas para mantener consistencia con nuestra aplicación
          token.role = typeof userWithRole.role === 'string' 
            ? userWithRole.role.toLowerCase() 
            : String(userWithRole.role).toLowerCase();
        } else {
          // Si no, asignar rol basado en el email
          token.role = ADMIN_EMAILS.includes(user.email as string) ? "admin" : "user"
        }
      }
      return token
    },

    // Validar el inicio de sesión
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // Verificar si el email está verificado y es válido
        const isValidEmail = profile?.email_verified && 
          (profile?.email?.endsWith("@gmail.com") || 
           ADMIN_EMAILS.includes(profile?.email as string));
           
        if (isValidEmail && profile?.email) {
          // Si el usuario es administrador, actualizar su rol en la base de datos
          const isAdmin = ADMIN_EMAILS.includes(profile.email as string);
          
          try {
            // Buscar el usuario existente por email
            const user = await prisma.user.findUnique({
              where: { email: profile.email as string }
            });
            
            // Si el usuario existe, intentar actualizar su rol
            if (user) {
              // Usar prisma.$queryRaw para hacer una actualización directa sin errores de tipo
              await prisma.$executeRaw`
                UPDATE "User" 
                SET "role" = ${isAdmin ? 'ADMIN' : 'USER'}::\"Role\" 
                WHERE "id" = ${user.id}
              `;
              console.log(`Rol de usuario ${profile.email} actualizado a ${isAdmin ? 'ADMIN' : 'USER'}`);
            }
          } catch (error) {
            console.error("Error al actualizar rol de usuario:", error);
            // El error no debería impedir que el usuario inicie sesión
          }
        }
        
        return Boolean(isValidEmail);
      }
      return true
    },

    // Redireccionar después del inicio de sesión
    async redirect({ url, baseUrl }) {
      // Asegurarse de que las URLs internas redirijan dentro de la app
      if (url.startsWith(baseUrl)) return url
      // Permitir redirecciones a URLs específicas
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Por defecto, redirigir a la página principal
      return baseUrl
    }
  },

  // Eventos para logging y acciones personalizadas
  events: {
    async signIn({ user, account, profile }) {
      // Registrar inicio de sesión exitoso
      console.log(`Usuario ${user.email} ha iniciado sesión`)
    },
    async signOut() {
      // Limpiar datos adicionales al cerrar sesión
      console.log(`Usuario ha cerrado sesión`)
    },
  },

  // Configuración de debug (solo en desarrollo)
  debug: process.env.NODE_ENV === "development",
}) 