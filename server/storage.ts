import { products, cartItems, wishlistItems, users, type Product, type CartItem, type WishlistItem, type User, type InsertProduct, type InsertCartItem, type InsertWishlistItem, type InsertUser } from "@shared/schema";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getPopularProducts(): Promise<Product[]>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Wishlist
  getWishlistItems(sessionId: string): Promise<WishlistItem[]>;
  addWishlistItem(item: InsertWishlistItem): Promise<WishlistItem>;
  removeWishlistItem(id: number): Promise<boolean>;
  isInWishlist(productId: number, sessionId: string): Promise<boolean>;
  
  // Users
  createUser(user: InsertUser): Promise<User>;
  getUserByMobile(mobileNumber: string): Promise<User | undefined>;
  getUserBySessionId(sessionId: string): Promise<User | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private wishlistItems: Map<number, WishlistItem>;
  private users: Map<number, User>;
  private currentProductId: number;
  private currentCartId: number;
  private currentWishlistId: number;
  private currentUserId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.wishlistItems = new Map();
    this.users = new Map();
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentWishlistId = 1;
    this.currentUserId = 1;
    
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: Product[] = [
      // Coffee Drinks
      {
        id: 1,
        name: "Espresso Supreme",
        description: "Experience the pinnacle of coffee craftsmanship with our signature blend. Rich, bold, and perfectly balanced with notes of dark chocolate and caramel.",
        price: "5.49",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Espresso",
        rating: "4.9",
        reviewCount: 230,
        sizes: ["Small", "Medium", "Large"],
        isPopular: true,
      },
      {
        id: 2,
        name: "Golden Latte",
        description: "Smooth espresso combined with steamed milk and a touch of golden turmeric. A luxurious twist on the classic latte.",
        price: "6.99",
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Latte",
        rating: "4.7",
        reviewCount: 185,
        sizes: ["Small", "Medium", "Large"],
        isPopular: true,
      },
      {
        id: 3,
        name: "Velvet Cappuccino",
        description: "Perfect balance of espresso, steamed milk, and velvety microfoam. Crafted with precision for the ultimate coffee experience.",
        price: "5.99",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Cappuccino",
        rating: "4.8",
        reviewCount: 156,
        sizes: ["Small", "Medium", "Large"],
        isPopular: true,
      },
      {
        id: 4,
        name: "Midnight Americano",
        description: "Bold and robust coffee for those who appreciate the pure essence of premium coffee beans. Dark, rich, and invigorating.",
        price: "4.99",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Americano",
        rating: "4.5",
        reviewCount: 98,
        sizes: ["Small", "Medium", "Large"],
        isPopular: true,
      },
      {
        id: 5,
        name: "Chocolate Mocha",
        description: "Rich espresso blended with premium chocolate and steamed milk. Topped with whipped cream for the ultimate indulgence.",
        price: "7.49",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Mocha",
        rating: "4.6",
        reviewCount: 142,
        sizes: ["Small", "Medium", "Large"],
        isPopular: false,
      },
      {
        id: 6,
        name: "Vanilla Macchiato",
        description: "Espresso marked with steamed milk and vanilla syrup. A sweet and smooth coffee experience with aromatic vanilla notes.",
        price: "6.49",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Macchiato",
        rating: "4.4",
        reviewCount: 76,
        sizes: ["Small", "Medium", "Large"],
        isPopular: false,
      },
      // Matcha Drinks
      {
        id: 7,
        name: "Premium Matcha Latte",
        description: "Authentic Japanese matcha powder blended with steamed milk. Rich in antioxidants and naturally energizing.",
        price: "7.99",
        image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Matcha",
        rating: "4.8",
        reviewCount: 189,
        sizes: ["Small", "Medium", "Large"],
        isPopular: true,
      },
      {
        id: 8,
        name: "Iced Matcha",
        description: "Refreshing iced matcha with your choice of milk. Perfect for hot days with the perfect balance of sweet and earthy flavors.",
        price: "6.99",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Matcha",
        rating: "4.6",
        reviewCount: 134,
        sizes: ["Small", "Medium", "Large"],
        isPopular: false,
      },
      // Cupcakes
      {
        id: 9,
        name: "Vanilla Bean Cupcake",
        description: "Fluffy vanilla cupcake topped with rich buttercream frosting and vanilla bean specks. A classic treat that never goes out of style.",
        price: "4.99",
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Cupcakes",
        rating: "4.7",
        reviewCount: 203,
        sizes: ["Single"],
        isPopular: true,
      },
      {
        id: 10,
        name: "Chocolate Fudge Cupcake",
        description: "Decadent chocolate cupcake with rich fudge frosting and chocolate shavings. Perfect for chocolate lovers.",
        price: "5.49",
        image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Cupcakes",
        rating: "4.8",
        reviewCount: 167,
        sizes: ["Single"],
        isPopular: true,
      },
      {
        id: 11,
        name: "Red Velvet Cupcake",
        description: "Classic red velvet cupcake with cream cheese frosting. Moist, flavorful, and beautifully presented.",
        price: "5.99",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Cupcakes",
        rating: "4.9",
        reviewCount: 145,
        sizes: ["Single"],
        isPopular: false,
      },
      // Pastries
      {
        id: 12,
        name: "Butter Croissant",
        description: "Flaky, buttery croissant baked fresh daily. Perfect with your morning coffee or as a light snack.",
        price: "3.99",
        image: "https://images.unsplash.com/photo-1555507036-ab794f1083c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Pastries",
        rating: "4.6",
        reviewCount: 298,
        sizes: ["Single"],
        isPopular: true,
      },
      {
        id: 13,
        name: "Almond Danish",
        description: "Delicate puff pastry filled with sweet almond cream and topped with sliced almonds. A European classic.",
        price: "4.49",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Pastries",
        rating: "4.5",
        reviewCount: 89,
        sizes: ["Single"],
        isPopular: false,
      },
      {
        id: 14,
        name: "Pain au Chocolat",
        description: "Buttery croissant dough wrapped around rich dark chocolate. The perfect combination of flaky pastry and chocolate.",
        price: "4.99",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Pastries",
        rating: "4.7",
        reviewCount: 156,
        sizes: ["Single"],
        isPopular: true,
      },
      // Snacks
      {
        id: 15,
        name: "Gourmet Granola Bar",
        description: "Homemade granola bar with oats, nuts, dried fruits, and honey. A healthy and satisfying snack option.",
        price: "3.49",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Snacks",
        rating: "4.4",
        reviewCount: 123,
        sizes: ["Single"],
        isPopular: false,
      },
      {
        id: 16,
        name: "Artisan Cookies",
        description: "Pack of 3 freshly baked cookies with chocolate chips, oatmeal raisin, and peanut butter varieties.",
        price: "5.99",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
        category: "Snacks",
        rating: "4.6",
        reviewCount: 267,
        sizes: ["Pack of 3"],
        isPopular: true,
      }
    ];

    mockProducts.forEach((product) => {
      this.products.set(product.id, product);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getPopularProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isPopular
    );
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartId++;
    const item: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1,
      customizations: insertItem.customizations || null
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
    return true;
  }

  // Wishlist
  async getWishlistItems(sessionId: string): Promise<WishlistItem[]> {
    return Array.from(this.wishlistItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addWishlistItem(insertItem: InsertWishlistItem): Promise<WishlistItem> {
    const id = this.currentWishlistId++;
    const item: WishlistItem = { ...insertItem, id, createdAt: new Date() };
    this.wishlistItems.set(id, item);
    return item;
  }

  async removeWishlistItem(id: number): Promise<boolean> {
    return this.wishlistItems.delete(id);
  }

  async isInWishlist(productId: number, sessionId: string): Promise<boolean> {
    return Array.from(this.wishlistItems.values()).some(
      (item) => item.productId === productId && item.sessionId === sessionId
    );
  }

  // Users
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUserByMobile(mobileNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.mobileNumber === mobileNumber
    );
  }

  async getUserBySessionId(sessionId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.sessionId === sessionId
    );
  }
}

export const storage = new MemStorage();
