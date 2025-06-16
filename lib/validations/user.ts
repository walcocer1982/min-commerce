import { z } from "zod";

// Esquema de validación para usuarios
export const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email inválido"),
  image: z.string().url("Debe ser una URL válida").optional()
});

// Esquema para actualizar un usuario - todos los campos son opcionales
export const UpdateUserSchema = UserSchema.partial();

// Esquema para parámetros de ID
export const UserIdSchema = z.object({
  id: z.string().min(1, "El ID es requerido")
});

// Tipos derivados de los esquemas
export type User = z.infer<typeof UserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>; 