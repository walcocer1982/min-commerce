import { z } from "zod";

// Esquema de validación para productos
export const ProductSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  price: z.number().positive("El precio debe ser positivo"),
  description: z.string().min(1, "La descripción es requerida"),
  imageUrl: z.string().url("Debe ser una URL válida"),
  category: z.string().min(1, "La categoría es requerida"),
  onSale: z.boolean().default(false),
  stock: z.number().int().min(0, "El stock no puede ser negativo").default(0)
});

// Esquema para crear un producto
export const CreateProductSchema = ProductSchema;

// Esquema para actualizar un producto - todos los campos son opcionales
export const UpdateProductSchema = ProductSchema.partial();

// Esquema para parámetros de ID
export const ProductIdSchema = z.object({
  id: z.string().min(1, "El ID es requerido")
});

// Tipos derivados de los esquemas
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type UpdateProduct = z.infer<typeof UpdateProductSchema>; 