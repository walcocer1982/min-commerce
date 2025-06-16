"use client"

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/hooks/useStore'

export function ToggleCartButton() {
  const { cart, toggleCartWithCheck } = useStore()
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleCartWithCheck}
      className="relative"
      aria-label="Abrir carrito"
    >
      <ShoppingCart className="h-5 w-5" />
      
      {/* Badge para mostrar el número de items */}
      {cart.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cart.totalItems}
        </span>
      )}
    </Button>
  )
} 