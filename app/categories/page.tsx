"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Product } from "@/lib/data/products"

// Interfaz para representar datos de categoría con productos
interface CategoryData {
  name: string
  count: number
  image: string
}

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Obtener productos y organizarlos por categoría
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Error al cargar productos")
        const products: Product[] = await res.json()
        
        // Agrupar productos por categoría
        const categoryMap = new Map<string, Product[]>()
        products.forEach(product => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, [])
          }
          categoryMap.get(product.category)?.push(product)
        })
        
        // Convertir a array de categorías
        const categoryArray: CategoryData[] = Array.from(categoryMap.entries()).map(([name, products]) => ({
          name,
          count: products.length,
          // Usar la imagen del primer producto de la categoría
          image: products[0]?.imageUrl || ""
        }))
        
        setCategories(categoryArray)
      } catch (err) {
        setError("No se pudieron cargar las categorías")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, [])

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Categorías</h1>
      
      {/* Estado de carga o error */}
      {loading && <p className="text-center py-8">Cargando categorías...</p>}
      {error && <p className="text-center py-8 text-red-500">{error}</p>}
      
      {/* Lista de categorías */}
      {!loading && !error && (
        <>
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No se encontraron categorías</h3>
              <Link href="/products">
                <Button className="mt-4">Ver todos los productos</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.name}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div 
                    className="h-40 w-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    <div className="w-full h-full flex items-end bg-gradient-to-t from-black/70 to-transparent p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} productos</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Button variant="ghost" className="w-full justify-between">
                      Ver productos
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Enlace a todos los productos */}
          <div className="flex justify-center mt-10">
            <Link href="/products">
              <Button variant="outline">Ver todos los productos</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
} 