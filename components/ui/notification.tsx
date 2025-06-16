"use client"

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Notification as NotificationType, useNotificationStore } from '@/lib/store'

interface NotificationProps {
  notification: NotificationType
  onClose: () => void
}

// Componente individual de notificación
export function Notification({ notification, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Colores según el tipo de notificación
  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-100 border-green-500 text-green-800'
      case 'error':
        return 'bg-red-100 border-red-500 text-red-800'
      case 'warning':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800'
      case 'info':
      default:
        return 'bg-blue-100 border-blue-500 text-blue-800'
    }
  }
  
  // Animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])
  
  // Manejar cierre con animación
  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }
  
  return (
    <div
      className={`border-l-4 p-4 mb-3 rounded shadow-md flex items-start justify-between transition-all duration-300 ease-in-out ${getColors()} ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'
      }`}
    >
      <div>
        <p className="font-medium">{notification.message}</p>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-800 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X size={18} />
      </button>
    </div>
  )
}

// Componente contenedor de notificaciones
export function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore()
  
  if (notifications.length === 0) return null
  
  return (
    <div className="fixed top-5 right-5 z-50 w-80 max-w-full">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
} 