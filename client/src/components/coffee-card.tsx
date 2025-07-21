import { Plus } from "lucide-react";
import type { Product } from "@shared/schema";

interface CoffeeCardProps {
  product: Product;
  onClick: () => void;
}

export default function CoffeeCard({ product, onClick }: CoffeeCardProps) {
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
    <div 
      className="bg-light-beige rounded-2xl p-4 coffee-card transition-smooth cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-32 object-cover rounded-xl mb-3"
      />
      <h3 className="font-semibold mb-1 text-rich-brown">{product.name}</h3>
      <div className="flex items-center mb-2">
        {renderStars(product.rating)}
        <span className="text-xs text-warm-gray ml-2">{product.rating}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-bold text-rich-brown">${product.price}</span>
        <button 
          className="bg-light-gold text-rich-brown rounded-full w-8 h-8 flex items-center justify-center transition-smooth hover:bg-coffee-tan"
          onClick={(e) => {
            e.stopPropagation();
            // Handle add to cart directly from card
          }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
