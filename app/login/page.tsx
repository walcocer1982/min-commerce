import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import Link from "next/link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  // Extraer y procesar los parámetros de búsqueda de forma segura
  const callbackUrlParam = searchParams?.callbackUrl;
  const callbackUrl = typeof callbackUrlParam === 'string' 
    ? callbackUrlParam 
    : Array.isArray(callbackUrlParam) && callbackUrlParam.length > 0
      ? callbackUrlParam[0] 
      : "/";

  const errorParam = searchParams?.error;
  const errorType = typeof errorParam === 'string' 
    ? errorParam 
    : Array.isArray(errorParam) && errorParam.length > 0
      ? errorParam[0] 
      : null;

  // Mensajes de error para diferentes casos
  const errorMessages: Record<string, string> = {
    "OAuthSignin": "Error al iniciar el proceso de autenticación con Google.",
    "OAuthCallback": "Error en la respuesta de Google.",
    "OAuthCreateAccount": "Error al crear la cuenta.",
    "Callback": "Error durante el proceso de autenticación.",
    "default": "Ocurrió un error al intentar iniciar sesión.",
    "AccessDenied": "Acceso denegado.",
    "Configuration": "Error de configuración en el servidor."
  };

  const errorMessage = errorType ? (errorMessages[errorType] || errorMessages.default) : null;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Inicia sesión</CardTitle>
          <CardDescription>
            Inicia sesión con tu cuenta de Google para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 gap-4">
            <form action={async () => {
              "use server";
              try {
                await signIn("google", {
                  redirectTo: callbackUrl,
                });
              } catch (error) {
                console.error("Error al iniciar sesión:", error);
              }
            }}>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                  </g>
                </svg>
                Iniciar sesión con Google
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center">
            Al iniciar sesión, aceptas nuestros términos y condiciones.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 