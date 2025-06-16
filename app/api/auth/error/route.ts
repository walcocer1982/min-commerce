import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const errorType = url.searchParams.get("error") || "default";
  
  // Redirigir a la página de login con el parámetro de error
  return NextResponse.redirect(new URL(`/login?error=${errorType}`, url.origin));
} 