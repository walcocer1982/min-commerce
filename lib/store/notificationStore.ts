import { create } from 'zustand';
import { z } from 'zod';

// Esquema para validar las notificaciones
const NotificationSchema = z.object({
  id: z.string(),
  message: z.string(),
  type: z.enum(['success', 'error', 'warning', 'info']),
  duration: z.number().int().positive().default(5000), // Duración en ms
  createdAt: z.date(),
});

// Tipos para las notificaciones
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type Notification = z.infer<typeof NotificationSchema>;
export type CreateNotification = Omit<Notification, 'id' | 'createdAt'>;

// Interface para el estado de notificaciones
interface NotificationState {
  notifications: Notification[];
  
  // Acciones
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Crear el store con Zustand
export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  
  // Añadir una notificación
  addNotification: (notification) => {
    try {
      // Validar la notificación
      const { message, type, duration } = NotificationSchema.omit({ id: true, createdAt: true }).parse(notification);
      
      // Crear nueva notificación
      const newNotification: Notification = {
        id: crypto.randomUUID(),
        message,
        type,
        duration,
        createdAt: new Date(),
      };
      
      set((state) => ({
        notifications: [...state.notifications, newNotification],
      }));
      
      // Configurar eliminación automática después de la duración
      setTimeout(() => {
        get().removeNotification(newNotification.id);
      }, duration);
      
      return newNotification.id;
    } catch (error) {
      console.error('Error al añadir notificación:', error);
      return '';
    }
  },
  
  // Eliminar una notificación
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    }));
  },
  
  // Limpiar todas las notificaciones
  clearNotifications: () => {
    set({ notifications: [] });
  },
})); 