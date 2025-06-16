'use client'

import { Button } from "@/components/ui/button"
import { useCartStore, useNotificationStore } from "@/lib/store"
import type { Product } from "@/lib/data/products"

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const { addNotification } = useNotificationStore()

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl
    });
    
    // Mostrar notificación en lugar de alerta
    addNotification({
      message: `Añadido al carrito: ${product.title}`,
      type: 'success',
      duration: 3000,
    });
  };

  return (
    <Button 
      className="w-full" 
      onClick={handleAddToCart}
    >
      Añadir al carrito
    </Button>
  )
}
