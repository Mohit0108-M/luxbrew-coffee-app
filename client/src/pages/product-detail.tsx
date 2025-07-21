import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation, useParams } from "wouter";
import QuantitySelector from "@/components/quantity-selector";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedSize, setSelectedSize] = useState("Small");
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: { productId: number; quantity: number; size: string }) => {
      return apiRequest("POST", "/api/cart", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to Cart",
        description: `${product?.name} has been added to your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      return apiRequest("POST", "/api/wishlist", { productId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Added to Wishlist",
        description: `${product?.name} has been added to your wishlist.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addToCartMutation.mutate({
        productId: product.id,
        quantity,
        size: selectedSize,
      });
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlistMutation.mutate(product.id);
    }
  };

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

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 !== 0;
    
    return (
      <div className="flex star-rating text-lg">
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
      <div className="min-h-screen bg-cream-white">
        <div className="relative">
          <div className="h-80 bg-warm-gray animate-pulse"></div>
          <div className="bg-cream-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-8 pb-32">
            <div className="max-w-md mx-auto">
              <div className="h-8 bg-warm-gray rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-warm-gray rounded mb-6 w-3/4 animate-pulse"></div>
              <div className="h-20 bg-warm-gray rounded mb-6 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-2xl font-bold mb-4">Product Not Found</h1>
          <button 
            onClick={() => setLocation("/home")}
            className="bg-light-gold text-rich-brown px-6 py-3 rounded-xl font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="relative">
        {/* Coffee Image Section */}
        <div className="relative h-80">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <button 
              onClick={() => setLocation("/products")} 
              className="bg-cream-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center text-rich-brown"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddToWishlist}
              disabled={addToWishlistMutation.isPending}
              className="bg-cream-white bg-opacity-90 rounded-full w-10 h-10 flex items-center justify-center text-rich-brown hover:text-light-gold transition-smooth"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-cream-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-8 pb-32">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-playfair text-3xl font-bold">{product.name}</h1>
              <span className="font-bold text-2xl text-rich-brown">
                ₹{getSizePrice(product.price, selectedSize).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center mb-6">
              {renderStars(product.rating)}
              <span className="text-warm-gray font-medium ml-3">
                {product.rating} ({product.reviewCount}+ reviews)
              </span>
            </div>

            <p className="text-warm-gray mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size Options */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-lg">Choose Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-option flex-1 py-3 px-4 rounded-xl font-medium transition-smooth ${
                      selectedSize === size ? "selected" : ""
                    }`}
                  >
                    <div className="text-sm">{size}</div>
                    <div className="text-xs opacity-70">
                      {size === "Small" ? "8 oz" : size === "Medium" ? "12 oz" : "16 oz"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold">Quantity</span>
                <QuantitySelector 
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                />
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={addToCartMutation.isPending}
                className="bg-light-gold text-rich-brown px-6 py-3 rounded-xl font-semibold transition-smooth hover:bg-coffee-tan disabled:opacity-50"
              >
                {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
