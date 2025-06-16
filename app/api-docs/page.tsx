import { products } from "@/lib/data/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ApiDocsPage() {
  // Define la especificación de la API
  const apiSpec = {
    title: "API de Productos",
    version: "1.0.0",
    description: "API para gestionar productos de la tienda",
    endpoints: [
      {
        path: "/api/products",
        method: "GET",
        description: "Obtener todos los productos",
        response: {
          status: 200,
          type: "array",
          description: "Lista de productos",
          example: products.slice(0, 2),
        },
      },
      {
        path: "/api/products/{id}",
        method: "GET",
        description: "Obtener un producto específico",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "string",
            description: "Identificador único del producto",
          },
        ],
        response: {
          status: 200,
          type: "object",
          description: "Detalles del producto",
          example: products[0],
        },
        errorResponses: [
          {
            status: 404,
            description: "Producto no encontrado",
            example: { error: "Producto no encontrado" },
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{apiSpec.title}</h1>
      <p className="text-muted-foreground mb-8">{apiSpec.description} - v{apiSpec.version}</p>

      <h2 className="text-2xl font-bold mb-4">Endpoints</h2>

      {apiSpec.endpoints.map((endpoint, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">{endpoint.method}</Badge>
              <CardTitle className="font-mono text-lg">{endpoint.path}</CardTitle>
            </div>
            <p className="text-muted-foreground mt-2">{endpoint.description}</p>
          </CardHeader>
          <CardContent>
            {/* Detalles */}
            {endpoint.parameters && endpoint.parameters.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Parámetros</h3>
                <ul className="space-y-2">
                  {endpoint.parameters.map((param, i) => (
                    <li key={i} className="border-b pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{param.name}</span>
                        <Badge variant="secondary">{param.type}</Badge>
                        {param.required && (
                          <Badge variant="destructive">Requerido</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{param.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Respuesta */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Respuesta</h3>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{endpoint.response.status}</Badge>
                  <span className="font-medium">{endpoint.response.description}</span>
                </div>
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-80 font-mono text-sm">
                  {JSON.stringify(endpoint.response.example, null, 2)}
                </pre>
              </div>
            </div>

            {/* Errores */}
            {endpoint.errorResponses && endpoint.errorResponses.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Errores posibles</h3>
                <ul className="space-y-4">
                  {endpoint.errorResponses.map((error, i) => (
                    <li key={i} className="border-b pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="destructive">{error.status}</Badge>
                        <span>{error.description}</span>
                      </div>
                      <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-60 font-mono text-sm">
                        {JSON.stringify(error.example, null, 2)}
                      </pre>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <h2 className="text-2xl font-bold mt-8 mb-4">Modelos</h2>
      <Card>
        <CardHeader>
          <CardTitle>Product</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-80 font-mono text-sm">
{`{
  "id": "string", // Identificador único del producto
  "title": "string", // Nombre del producto
  "price": "number", // Precio del producto
  "description": "string", // Descripción detallada del producto
  "imageUrl": "string", // URL de la imagen del producto
  "category": "string", // Categoría a la que pertenece el producto
  "onSale": "boolean" // Indica si el producto está en oferta (opcional)
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
} 