import { ArrowLeft, Settings, History, Gift, CreditCard, Headphones, ChevronRight, User } from "lucide-react";
import { useLocation } from "wouter";

export default function ProfilePage() {
  const [, setLocation] = useLocation();

  const menuItems = [
    {
      icon: History,
      label: "Order History",
      onClick: () => console.log("Order History clicked"),
    },
    {
      icon: Gift,
      label: "Rewards",
      onClick: () => console.log("Rewards clicked"),
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      onClick: () => console.log("Payment Methods clicked"),
    },
    {
      icon: Headphones,
      label: "Support",
      onClick: () => console.log("Support clicked"),
    },
  ];

  return (
    <div className="pb-20">
      <div className="bg-cream-white px-4 py-6 sticky top-0 z-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <button onClick={() => setLocation("/home")} className="text-rich-brown">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="font-playfair text-2xl font-bold">Profile</h1>
            <button className="text-rich-brown">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pb-20">
        <div className="max-w-md mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-light-gold rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-12 h-12 text-rich-brown" />
            </div>
            <h2 className="font-playfair text-2xl font-bold mb-1">Coffee Lover</h2>
            <p className="text-warm-gray">Member since 2024</p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-light-beige rounded-2xl p-4 text-center">
              <div className="font-bold text-xl text-rich-brown">47</div>
              <div className="text-warm-gray text-sm">Orders</div>
            </div>
            <div className="bg-light-beige rounded-2xl p-4 text-center">
              <div className="font-bold text-xl text-rich-brown">2</div>
              <div className="text-warm-gray text-sm">Favorites</div>
            </div>
            <div className="bg-light-beige rounded-2xl p-4 text-center">
              <div className="font-bold text-xl text-rich-brown">Gold</div>
              <div className="text-warm-gray text-sm">Status</div>
            </div>
          </div>

          {/* Menu Options */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full bg-light-beige rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-light-gold transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <item.icon className="w-5 h-5 text-rich-brown" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-warm-gray" />
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="mt-8 pt-8 border-t border-light-beige">
            <button className="w-full bg-rich-brown text-cream-white py-4 rounded-xl font-semibold transition-smooth hover:bg-coffee-tan">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
