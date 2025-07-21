import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <button 
        className="quantity-btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="font-bold text-lg min-w-8 text-center">{quantity}</span>
      <button 
        className="quantity-btn"
        onClick={onIncrease}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
