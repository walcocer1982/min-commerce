import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { z } from 'zod';

// Esquema para validar los items del carrito
const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  title: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  imageUrl: z.string().url().optional(),
});

// Tipos para el carrito
export type CartItem = z.infer<typeof CartItemSchema>;

// Interface para el estado del carrito
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  
  // Acciones
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Getters
  getItem: (productId: string) => CartItem | undefined;
}

// Crear el store con Zustand
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      
      // Añadir un item al carrito
      addItem: (item) => {
        try {
          // Validar el item sin el id
          const { productId, title, price, quantity, imageUrl } = CartItemSchema.omit({ id: true }).parse(item);
          
          const { items } = get();
          
          // Verificar si el producto ya está en el carrito
          const existingItem = items.find((i) => i.productId === productId);
          
          if (existingItem) {
            // Si existe, actualizar la cantidad
            return get().updateQuantity(productId, existingItem.quantity + quantity);
          }
          
          // Si no existe, añadir nuevo item
          const newItem: CartItem = {
            id: crypto.randomUUID(),
            productId,
            title,
            price,
            quantity,
            imageUrl,
          };
          
          set((state) => {
            const newItems = [...state.items, newItem];
            return {
              items: newItems,
              totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
              totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
            };
          });
        } catch (error) {
          console.error('Error al añadir producto al carrito:', error);
        }
      },
      
      // Eliminar un item del carrito
      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.productId !== productId);
          return {
            items: newItems,
            totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
            totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
          };
        });
      },
      
      // Actualizar la cantidad de un item
      updateQuantity: (productId, quantity) => {
        try {
          // Validar que la cantidad sea positiva
          const validQuantity = z.number().int().positive().parse(quantity);
          
          set((state) => {
            const newItems = state.items.map((item) => {
              if (item.productId === productId) {
                return { ...item, quantity: validQuantity };
              }
              return item;
            });
            
            return {
              items: newItems,
              totalItems: newItems.reduce((total, item) => total + item.quantity, 0),
              totalPrice: newItems.reduce((total, item) => total + (item.price * item.quantity), 0),
            };
          });
        } catch (error) {
          console.error('Error al actualizar cantidad:', error);
        }
      },
      
      // Limpiar el carrito
      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
        });
      },
      
      // Obtener un item específico
      getItem: (productId) => {
        return get().items.find((item) => item.productId === productId);
      },
    }),
    {
      name: 'min-commerce-cart', // Nombre para localStorage
    }
  )
); 