"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/data/products";

// Tipos de compatibilidad para el antiguo contexto
type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
  getItemCount: () => number;
};

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined);

// Wrapper del provider que adapta el store de Zustand al formato del contexto anterior
export function CartProvider({ children }: { children: ReactNode }) {
  // Este componente ahora solo pasa los children, ya que el estado está en Zustand
  return <CartContext.Provider value={cartAdapter()}>{children}</CartContext.Provider>;
}

// Hook de compatibilidad para mantener la misma API
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

// Función adaptadora que convierte el formato de Zustand al formato del contexto antiguo
function cartAdapter(): CartContextType {
  // Obtenemos funciones del store de Zustand
  const { items: zustandItems, addItem: zustandAddItem, removeItem: zustandRemoveItem, updateQuantity: zustandUpdateQuantity, totalItems, totalPrice } = useCartStore();
  
  // Adaptar los items al formato antiguo
  const adaptedItems: CartItem[] = zustandItems.map(item => ({
    product: {
      id: item.productId,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl || "",
      description: "", // Valores por defecto para campos requeridos
      category: "",
      onSale: false,
      stock: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    quantity: item.quantity
  }));
  
  return {
    items: adaptedItems,
    
    // Adaptar la función addItem
    addItem: (product: Product, quantity: number = 1) => {
      zustandAddItem({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl
      });
    },
    
    // Adaptar la función removeItem
    removeItem: (id: string) => {
      zustandRemoveItem(id);
    },
    
    // Adaptar la función updateQuantity
    updateQuantity: (id: string, quantity: number) => {
      zustandUpdateQuantity(id, quantity);
    },
    
    // Adaptar getTotal usando el totalPrice de Zustand
    getTotal: () => {
      return totalPrice;
    },
    
    // Adaptar getItemCount usando el totalItems de Zustand
    getItemCount: () => {
      return totalItems;
    }
  };
} 