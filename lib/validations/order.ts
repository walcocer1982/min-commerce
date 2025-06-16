import { z } from "zod";

// Enum para el estado de la orden
export const OrderStatusEnum = z.enum([
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED"
]);

// Esquema para item de orden
export const OrderItemSchema = z.object({
  productId: z.string().min(1, "El ID del producto es requerido"),
  quantity: z.number().int().positive("La cantidad debe ser un número positivo"),
  price: z.number().positive("El precio debe ser positivo")
});

// Esquema de validación para órdenes
export const OrderSchema = z.object({
  userId: z.string().min(1, "El ID del usuario es requerido"),
  status: OrderStatusEnum.default("PENDING"),
  total: z.number().min(0, "El total no puede ser negativo"),
  items: z.array(OrderItemSchema).min(1, "La orden debe tener al menos un producto")
});

// Esquema para crear una orden
export const CreateOrderSchema = OrderSchema;

// Esquema para actualizar una orden - todos los campos son opcionales
export const UpdateOrderSchema = OrderSchema.partial();

// Esquema para parámetros de ID
export const OrderIdSchema = z.object({
  id: z.string().min(1, "El ID es requerido")
});

// Tipos derivados de los esquemas
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export type OrderItem = z.infer<typeof OrderItemSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;
export type UpdateOrder = z.infer<typeof UpdateOrderSchema>; 