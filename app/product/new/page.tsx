"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/ProductForm"
import { type CreateProduct } from "@/lib/validations/product"

export default function NewProductPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleCreateProduct = async (data: CreateProduct) => {
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        
        // Si hay errores de validación de Zod, mostrarlos
        if (errorData.details) {
          throw new Error(
            `Error de validación: ${errorData.details
              .map((err: any) => `${err.path.join(".")}: ${err.message}`)
              .join(", ")}`
          )
        }
        
        throw new Error(errorData.error || "Error al crear producto")
      }

      setSuccess("Producto creado exitosamente")
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 2000)
    } catch (err: any) {
      console.error("Error al crear producto:", err)
      setError(err.message || "Error al crear producto")
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Agregar Nuevo Producto</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <ProductForm 
        onSubmit={handleCreateProduct} 
        buttonText="Crear Producto" 
      />
    </div>
  )
} 