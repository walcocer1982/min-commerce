import type { Product } from "@/lib/data/products";
import { products as databaseProducts } from "@/lib/data/products";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/product-image";
import Link from "next/link";

// Función para obtener productos (simulando acceso a base de datos)
async function getProducts(): Promise<Product[]> {
  console.log('Cargando productos desde datos estáticos');
  return databaseProducts;
}

export default async function ProductListPage() {
  // Obtener productos desde la "base de datos"
  const products = await getProducts();

  return (
    <div>
      <div className="flex flex-col items-center mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a TechStore - Página Principal</h1>
        <Badge variant="secondary" className="mb-4">Productos desde DB</Badge>
        <p className="text-muted-foreground max-w-2xl">
          Productos cargados desde la simulación de base de datos.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col h-full">
              <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  <ProductImage 
                    src={product.imageUrl}
                    alt={product.title}
                    onSale={product.onSale}
                  />
                  {product.onSale && (
                    <Badge variant="destructive" className="absolute top-2 right-2 z-10">
                      Oferta
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{product.title}</CardTitle>
                      <CardDescription className="mt-1">{product.category}</CardDescription>
                    </div>
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
              </Link>
              <CardFooter className="border-t pt-4">
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Añadir al Carrito
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {['Electrónica', 'Audio', 'Fotografía', 'Accesorios'].map((category) => (
            <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-center">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-center text-muted-foreground">
                  Ver productos
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}