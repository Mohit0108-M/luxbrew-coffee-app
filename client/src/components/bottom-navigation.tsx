import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Compass, ShoppingCart, Heart, List, User } from "lucide-react";
import type { CartItem, WishlistItem } from "@shared/schema";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const { data: wishlistItems = [] } = useQuery<WishlistItem[]>({
    queryKey: ["/api/wishlist"],
  });

  const navItems = [
    {
      icon: Compass,
      label: "Explore",
      path: "/home",
      badge: null,
    },
    {
      icon: ShoppingCart,
      label: "Cart",
      path: "/cart",
      badge: cartItems.length > 0 ? cartItems.length : null,
    },
    {
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      badge: null,
    },
    {
      icon: List,
      label: "Orders",
      path: "/products",
      badge: null,
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
      badge: null,
    },
  ];

  // Don't show navigation on splash page
  if (location === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-cream-white border-t border-light-beige z-30">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location === item.path || 
              (item.path === "/home" && (location === "/home" || location === "/"));
            
            return (
              <button
                key={item.path}
                onClick={() => setLocation(item.path)}
                className={`flex flex-col items-center gap-1 transition-smooth ${
                  isActive 
                    ? "text-light-gold" 
                    : "text-warm-gray hover:text-light-gold"
                }`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-light-gold text-rich-brown text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
