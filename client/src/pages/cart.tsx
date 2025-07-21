import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { CartItem, Product } from "@shared/schema";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

export default function CartPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [discountCode, setDiscountCode] = useState("");

  const { data: cartItems = [], isLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  // Combine cart items with product data
  const cartItemsWithProducts: CartItemWithProduct[] = cartItems
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as CartItemWithProduct[];

  const getSizePrice = (basePrice: string, size: string) => {
    const base = parseFloat(basePrice);
    switch (size) {
      case "Medium":
        return base + 1.00;
      case "Large":
        return base + 2.00;
      default:
        return base;
    }
  };

  const calculateSubtotal = () => {
    return cartItemsWithProducts.reduce((total, item) => {
      const price = getSizePrice(item.product.price, item.size);
      return total + (price * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 0 ? 2.50 : 0;
  const tax = subtotal * 0.08875; // 8.875% tax
  const total = subtotal + deliveryFee + tax;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItemMutation.mutate(id);
    } else {
      updateQuantityMutation.mutate({ id, quantity: newQuantity });
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      toast({
        title: "Discount Applied",
        description: "Your discount code has been applied!",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="pb-20">
        <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <ArrowLeft className="w-6 h-6 text-rich-brown" />
              <h1 className="font-playfair text-2xl font-bold">My Cart</h1>
              <span className="text-rich-brown font-medium">Loading...</span>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="max-w-md mx-auto space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-light-beige rounded-2xl p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-warm-gray rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-warm-gray rounded mb-2"></div>
                    <div className="h-3 bg-warm-gray rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-warm-gray rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <button onClick={() => setLocation("/home")} className="text-rich-brown">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-playfair text-2xl font-bold">My Cart</h1>
            <span className="text-rich-brown font-medium">
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-32">
        <div className="max-w-md mx-auto">
          {cartItemsWithProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">☕</div>
              <h2 className="font-playfair text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-warm-gray mb-6">Add some delicious coffee to get started!</p>
              <button
                onClick={() => setLocation("/home")}
                className="bg-light-gold text-rich-brown px-6 py-3 rounded-xl font-semibold"
              >
                Browse Coffee
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cartItemsWithProducts.map((item) => (
                  <div key={item.id} className="bg-light-beige rounded-2xl p-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.product.name}</h3>
                        <p className="text-warm-gray text-sm mb-2">
                          {item.size} • Extra Hot
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rich-brown">
                            ${getSizePrice(item.product.price, item.size).toFixed(2)}
                          </span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-light-gold text-rich-brown flex items-center justify-center text-sm font-bold"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-light-gold text-rich-brown flex items-center justify-center text-sm font-bold"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="bg-light-beige rounded-2xl p-4 mb-6">
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 bg-cream-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-light-gold"
                  />
                  <button 
                    onClick={handleApplyDiscount}
                    className="bg-light-gold text-rich-brown px-6 py-3 rounded-xl font-semibold transition-smooth hover:bg-coffee-tan"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-light-beige rounded-2xl p-6">
                <h3 className="font-playfair text-xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-warm-gray">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-cream-white pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-xl text-rich-brown">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-light-gold text-rich-brown py-4 rounded-xl font-bold text-lg transition-smooth hover:bg-coffee-tan">
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
