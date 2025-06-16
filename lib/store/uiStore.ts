import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interface para el estado de la UI
interface UIState {
  // Estado del carrito
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Estado de la barra de navegación móvil
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
  
  // Estado del modo oscuro
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  
  // Estado de la carga de la página
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

// Crear el store con Zustand
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Estado del carrito
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      // Estado de la barra de navegación móvil
      isMobileMenuOpen: false,
      openMobileMenu: () => set({ isMobileMenuOpen: true }),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
      toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      
      // Estado del modo oscuro
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
      
      // Estado de la carga de la página
      isLoading: false,
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'min-commerce-ui', // Nombre para localStorage
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
      }), // Solo persistir el modo oscuro
    }
  )
); 