import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useState } from "react";
import CoffeeCard from "@/components/coffee-card";
import { useLocation } from "wouter";
import type { Product } from "@shared/schema";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [, setLocation] = useLocation();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: popularProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products/popular"],
  });

  const categories = ["All", "Espresso", "Cappuccino", "Latte", "Americano", "Mocha"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="pb-20">
      {/* Search Header */}
      <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search your favorite coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-light-beige rounded-2xl px-6 py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-light-gold transition-smooth"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-gray w-5 h-5" />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-warm-gray hover:text-rich-brown"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto">
          {/* Luxury coffee beans close-up for promo background */}
          <div 
            className="bg-gradient-to-r from-rich-brown to-coffee-tan rounded-2xl p-6 card-shadow relative overflow-hidden"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="relative z-10 bg-rich-brown bg-opacity-80 rounded-xl p-4">
              <h3 className="font-playfair text-2xl font-bold text-cream-white mb-2">Buy One, Get One Free</h3>
              <p className="text-light-beige mb-4">Limited time offer on premium blends</p>
              <button className="bg-light-gold text-rich-brown px-6 py-2 rounded-full font-semibold transition-smooth hover:bg-coffee-tan">
                Claim Offer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 carousel-container">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium whitespace-nowrap transition-smooth cursor-pointer ${
                  selectedCategory === category
                    ? "bg-light-gold text-rich-brown"
                    : "bg-light-beige text-rich-brown hover:bg-light-gold"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Coffees or Search Results */}
      <div className="px-4 mb-20">
        <div className="max-w-md mx-auto">
          <h2 className="font-playfair text-2xl font-bold mb-4">
            {searchQuery || selectedCategory !== "All" ? "Search Results" : "Popular Coffees"}
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-light-beige rounded-2xl p-4 animate-pulse">
                  <div className="w-full h-32 bg-warm-gray rounded-xl mb-3"></div>
                  <div className="h-4 bg-warm-gray rounded mb-2"></div>
                  <div className="h-3 bg-warm-gray rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-warm-gray rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {(searchQuery || selectedCategory !== "All" ? filteredProducts : popularProducts).map((product) => (
                <CoffeeCard
                  key={product.id}
                  product={product}
                  onClick={() => setLocation(`/product/${product.id}`)}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredProducts.length === 0 && (searchQuery || selectedCategory !== "All") && (
            <div className="text-center py-8">
              <p className="text-warm-gray">No coffee found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-light-gold hover:text-coffee-tan"
              >
                View all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
