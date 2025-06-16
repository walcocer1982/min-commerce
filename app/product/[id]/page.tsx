import { notFound } from "next/navigation"
import type { Product } from "@/lib/data/products"
import { Badge } from "@/components/ui/badge"
import { headers } from 'next/headers'

async function getProduct(id: string): Promise<Product> {
  const host = headers().get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const res = await fetch(`${protocol}://${host}/api/products/${id}`, {
    cache: 'no-store'
  })
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

export default async function ProductDetailPage({
  params
}: {
  params: { id: string }
}) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  if (!product) {
    return <p>Producto no encontrado</p>
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Badge variant="outline" className="ml-2">Archivo page.tsx de detalle</Badge>
      </div>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-auto rounded-lg mb-4"
      />
      <p className="text-lg">{product.description}</p>
      <p className="text-xl font-bold text-green-600">${product.price}</p>
      <p className="text-sm text-gray-500">Categoría: {product.category}</p>
      {product.onSale && <p className="text-red-500">¡En oferta!</p>}
    </div>
  )
}