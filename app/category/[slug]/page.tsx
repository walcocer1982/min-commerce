import { headers } from "next/headers"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AddToCartButton from "@/components/AddToCartButton"
import { Product } from "@/lib/data/products"

// Función para obtener productos por categoría
async function getProductsByCategory(category: string): Promise<Product[]> {
  const host = headers().get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res = await fetch(`${protocol}://${host}/api/products`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch products')
  
  const allProducts = await res.json();
  // Filtrar por categoría
  return allProducts.filter((product: Product) => 
    product.category.toLowerCase() === category.toLowerCase()
  );
}

export default async function CategoryPage({
  params
}: {
  params: { slug: string }
}) {
  // Decodificar y normalizar el slug
  const categoryName = decodeURIComponent(params.slug);
  const products = await getProductsByCategory(categoryName);
  
  // Si no hay productos, mostrar 404
  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary">
              Categorías
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <span className="text-sm font-medium">{categoryName}</span>
          </div>
          <h1 className="text-3xl font-bold mt-2">{categoryName}</h1>
          <p className="text-muted-foreground mt-1">
            {products.length} {products.length === 1 ? 'producto' : 'productos'} encontrados
          </p>
        </div>
        
        <Link href="/products">
          <Button variant="outline">
            Ver todos los productos
          </Button>
        </Link>
      </div>
      
      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden flex flex-col h-full">
            <Link href={`/product/${product.id}`} className="block">
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  className="object-cover"
                  fill
                />
                {product.onSale && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    Oferta
                  </Badge>
                )}
              </div>
            </Link>
            
            <CardContent className="flex-grow p-4">
              <Link href={`/product/${product.id}`}>
                <CardTitle className="text-lg mb-2 hover:text-primary transition-colors">
                  {product.title}
                </CardTitle>
              </Link>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {product.description}
              </p>
              <Badge variant="outline" className="mb-3">
                {product.category}
              </Badge>
              <p className="text-lg font-bold">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            
            <CardFooter className="p-4 pt-0">
              <AddToCartButton product={product} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 