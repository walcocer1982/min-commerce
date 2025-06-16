import type { Metadata } from "next"
import { CartProvider } from "@/context/CartContext"
import Link from "next/link"
import "./globals.css"
import NavbarWithCart from "@/components/navbar-with-cart"
import { Providers } from "./providers"
import { AuthProvider } from "@/components/providers"
import { NotificationContainer } from "@/components/ui/notification"

export const metadata: Metadata = {
  title: "TechStore",
  description: "Tienda de electrónica y tecnología",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Providers>
            <CartProvider>
              <div className="min-h-screen">
                <NavbarWithCart />
                <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                  {children}
                </main>
                <footer className="bg-card text-card-foreground py-6 mt-12">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm">
                      © {new Date().getFullYear()} TechStore. Todos los derechos reservados.
                    </p>
                  </div>
                </footer>
                
                <NotificationContainer />
              </div>
            </CartProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
