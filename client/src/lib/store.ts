import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  sessionId: string;
  cartCount: number;
  wishlistCount: number;
  setCartCount: (count: number) => void;
  setWishlistCount: (count: number) => void;
}

// Generate a simple session ID
const generateSessionId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sessionId: generateSessionId(),
      cartCount: 0,
      wishlistCount: 0,
      setCartCount: (count) => set({ cartCount: count }),
      setWishlistCount: (count) => set({ wishlistCount: count }),
    }),
    {
      name: 'luxbrew-store',
    }
  )
);
