"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateProductSchema, type CreateProduct } from "@/lib/validations/product"

interface ProductFormProps {
  onSubmit: (data: CreateProduct) => Promise<void>
  initialData?: Partial<CreateProduct>
  buttonText?: string
}

export function ProductForm({ 
  onSubmit, 
  initialData = {}, 
  buttonText = "Guardar Producto" 
}: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Configurar react-hook-form con validación de Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: initialData
  })

  // Manejar envío del formulario
  const handleFormSubmit = async (data: CreateProduct) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
      reset() // Limpiar formulario después de envío exitoso
    } catch (error) {
      console.error("Error al enviar formulario:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Título
        </label>
        <input
          id="title"
          {...register("title")}
          className="w-full p-2 border rounded"
          placeholder="Nombre del producto"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Precio
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="w-full p-2 border rounded"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Descripción del producto"
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="imageUrl" className="text-sm font-medium">
          URL de Imagen
        </label>
        <input
          id="imageUrl"
          {...register("imageUrl")}
          className="w-full p-2 border rounded"
          placeholder="https://ejemplo.com/imagen.jpg"
        />
        {errors.imageUrl && (
          <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Categoría
        </label>
        <input
          id="category"
          {...register("category")}
          className="w-full p-2 border rounded"
          placeholder="Categoría del producto"
        />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="onSale"
          {...register("onSale")}
          className="rounded"
        />
        <label htmlFor="onSale" className="text-sm font-medium">
          En oferta
        </label>
        {errors.onSale && (
          <p className="text-sm text-red-500">{errors.onSale.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="stock" className="text-sm font-medium">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          {...register("stock", { valueAsNumber: true })}
          className="w-full p-2 border rounded"
          placeholder="0"
        />
        {errors.stock && (
          <p className="text-sm text-red-500">{errors.stock.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Enviando..." : buttonText}
      </button>
    </form>
  )
} 