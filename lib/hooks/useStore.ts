// Hook personalizado que combina varios stores de Zustand
import { useCartStore, useNotificationStore, useUIStore } from '@/lib/store';

// Este hook permite acceder a todos los stores en un solo lugar
export function useStore() {
  const cart = useCartStore();
  const notification = useNotificationStore();
  const ui = useUIStore();

  // Función de utilidad para mostrar notificación al añadir al carrito
  const addToCartWithNotification = (item: any) => {
    cart.addItem(item);
    notification.addNotification({
      message: `${item.title} añadido al carrito`,
      type: 'success',
      duration: 3000,
    });
  };

  // Función para toggle del carrito con notificación si está vacío
  const toggleCartWithCheck = () => {
    if (cart.items.length === 0 && !ui.isCartOpen) {
      notification.addNotification({
        message: 'El carrito está vacío',
        type: 'info',
        duration: 3000,
      });
    }
    ui.toggleCart();
  };

  return {
    cart,
    notification,
    ui,
    // Funciones combinadas
    addToCartWithNotification,
    toggleCartWithCheck,
  };
} 