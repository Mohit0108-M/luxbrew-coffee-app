import { useLocation } from "wouter";
import { useEffect } from "react";

export default function SplashPage() {
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    setLocation("/home");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Premium coffee being poured with rich, dark mood lighting */}
      <div 
        className="absolute inset-0 hero-gradient" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      
      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-cream-white mb-4 leading-tight">
          Choose Your Favorite Coffee
        </h1>
        <p className="text-light-beige text-lg mb-8 font-light leading-relaxed">
          The best grain, the finest roast, the powerful flavor
        </p>
        <button 
          onClick={handleGetStarted}
          className="bg-light-gold text-rich-brown px-8 py-4 rounded-full font-semibold text-lg transition-smooth hover:bg-coffee-tan hover:transform hover:scale-105 card-shadow"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
