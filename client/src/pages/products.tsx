import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Filter, Search, Heart } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductsPage() {
  const [, setLocation] = useLocation();
  const [selectedFilter, setSelectedFilter] = useState("All");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filters = ["All", "Hot", "Iced", "Premium"];

  const filteredProducts = products.filter(product => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Premium") return parseFloat(product.price) > 6;
    // For simplicity, treating all products as "Hot" for this demo
    return selectedFilter === "Hot";
  });

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

  return (
    <div className="pb-20">
      <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => setLocation("/home")} 
              className="text-rich-brown"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-playfair text-2xl font-bold">Our Menu</h1>
            <button className="text-rich-brown">
              <Filter className="w-6 h-6" />
            </button>
          </div>
          
          {/* Filter Tags */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth ${
                  selectedFilter === filter
                    ? "bg-light-gold text-rich-brown"
                    : "bg-light-beige text-rich-brown hover:bg-light-gold"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        <div className="max-w-md mx-auto space-y-4">
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-light-beige rounded-2xl p-4 flex items-center gap-4 animate-pulse">
                <div className="w-20 h-16 bg-warm-gray rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-warm-gray rounded mb-2"></div>
                  <div className="h-3 bg-warm-gray rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-warm-gray rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : (
            filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-light-beige rounded-2xl p-4 flex items-center gap-4 coffee-card transition-smooth cursor-pointer"
                onClick={() => setLocation(`/product/${product.id}`)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-20 h-16 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {renderStars(product.rating)}
                    <span className="text-xs text-warm-gray ml-2">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-rich-brown">₹{product.price}</span>
                    <button className="text-warm-gray hover:text-light-gold transition-smooth">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-warm-gray">No products found for the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
