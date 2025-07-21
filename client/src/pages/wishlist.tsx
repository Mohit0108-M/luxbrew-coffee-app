import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { WishlistItem, Product } from "@shared/schema";

interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

export default function WishlistPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery<WishlistItem[]>({
    queryKey: ["/api/wishlist"],
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/wishlist/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist.",
        variant: "destructive",
      });
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number; size: string }) => {
      return apiRequest("POST", "/api/cart", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    },
  });

  // Combine wishlist items with product data
  const wishlistItemsWithProducts: WishlistItemWithProduct[] = wishlistItems
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as WishlistItemWithProduct[];

  const handleAddToCart = (productId: number) => {
    addToCartMutation.mutate({
      productId,
      quantity: 1,
      size: "Medium",
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlistMutation.mutate(id);
  };

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex star-rating text-sm">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        {hasHalfStar && <span>☆</span>}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <span key={i} className="text-warm-gray">☆</span>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="pb-20">
        <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <ArrowLeft className="w-6 h-6 text-rich-brown" />
              <h1 className="font-playfair text-2xl font-bold">Wishlist</h1>
              <span className="text-rich-brown font-medium">Loading...</span>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="max-w-md mx-auto space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-light-beige rounded-2xl p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 bg-warm-gray rounded-xl"></div>
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
            <h1 className="font-playfair text-2xl font-bold">Wishlist</h1>
            <span className="text-rich-brown font-medium">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        <div className="max-w-md mx-auto">
          {wishlistItemsWithProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">💝</div>
              <h2 className="font-playfair text-2xl font-bold mb-2">Your wishlist is empty</h2>
              <p className="text-warm-gray mb-6">Save your favorite coffee for later!</p>
              <button
                onClick={() => setLocation("/home")}
                className="bg-light-gold text-rich-brown px-6 py-3 rounded-xl font-semibold"
              >
                Browse Coffee
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItemsWithProducts.map((item) => (
                <div key={item.id} className="bg-light-beige rounded-2xl p-4 flex items-center gap-4">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-20 h-16 object-cover rounded-xl cursor-pointer"
                    onClick={() => setLocation(`/product/${item.product.id}`)}
                  />
                  <div className="flex-1">
                    <h3 
                      className="font-semibold mb-1 cursor-pointer hover:text-light-gold"
                      onClick={() => setLocation(`/product/${item.product.id}`)}
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      {renderStars(item.product.rating)}
                      <span className="text-xs text-warm-gray ml-2">({item.product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-rich-brown">${item.product.price}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(item.product.id)}
                          disabled={addToCartMutation.isPending}
                          className="bg-light-gold text-rich-brown px-4 py-2 rounded-lg font-medium text-sm transition-smooth hover:bg-coffee-tan disabled:opacity-50 flex items-center gap-1"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          disabled={removeFromWishlistMutation.isPending}
                          className="text-light-gold hover:text-coffee-tan transition-smooth disabled:opacity-50"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
