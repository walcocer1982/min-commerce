"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import AddToCartButton from "@/components/AddToCartButton"
import { Product } from "@/lib/data/products"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchParam = searchParams.get("search")
  
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [filter, setFilter] = useState({
    category: categoryParam || "all",
    search: searchParam || "",
    sort: "default"
  })

  // Obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/products")
        if (!res.ok) throw new Error("Error al cargar productos")
        const data = await res.json()
        setProducts(data)
        
        // Extraer categorías únicas
        const uniqueCategories = [...new Set(data.map((p: Product) => p.category))]
        setCategories(uniqueCategories)
      } catch (err) {
        setError("No se pudieron cargar los productos")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Filtrar y ordenar productos
  const filteredProducts = products
    .filter(product => {
      // Filtrar por categoría
      if (filter.category && filter.category !== "all" && product.category !== filter.category) {
        return false
      }
      
      // Filtrar por búsqueda
      if (filter.search && 
        !product.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !product.description.toLowerCase().includes(filter.search.toLowerCase())) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      // Ordenar productos
      switch (filter.sort) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
      
      {/* Filtros */}
      <div className="bg-card p-6 rounded-lg mb-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div>
            <label className="text-sm font-medium mb-1 block">Buscar</label>
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={filter.search}
              onChange={(e) => setFilter({...filter, search: e.target.value})}
            />
          </div>
          
          {/* Categoría */}
          <div>
            <label className="text-sm font-medium mb-1 block">Categoría</label>
            <Select
              value={filter.category}
              onValueChange={(value) => setFilter({...filter, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Ordenar */}
          <div>
            <label className="text-sm font-medium mb-1 block">Ordenar por</label>
            <Select
              value={filter.sort}
              onValueChange={(value) => setFilter({...filter, sort: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Destacados</SelectItem>
                <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
                <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Estado de carga o error */}
      {loading && <p className="text-center py-8">Cargando productos...</p>}
      {error && <p className="text-center py-8 text-red-500">{error}</p>}
      
      {/* Lista de productos */}
      {!loading && !error && (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No se encontraron productos</h3>
              <p className="text-muted-foreground mt-2">
                Intenta cambiar los filtros o buscar otro producto
              </p>
              <Button 
                className="mt-4"
                onClick={() => setFilter({category: "all", search: "", sort: "default"})}
              >
                Ver todos los productos
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
          )}
        </>
      )}
    </div>
  )
} 