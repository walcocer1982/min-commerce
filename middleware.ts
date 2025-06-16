import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Simplificado para depuración - siempre permite el acceso
  console.log("Middleware ejecutándose, ruta:", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/profile"],
} 