import { products, cartItems, wishlistItems, type Product, type CartItem, type WishlistItem, type InsertProduct, type InsertCartItem, type InsertWishlistItem } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private wishlistItems: Map<number, WishlistItem>;
  private currentProductId: number;
  private currentCartId: number;
  private currentWishlistId: number;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.wishlistItems = new Map();
    this.currentProductId = 1;
    this.currentCartId = 1;
    this.currentWishlistId = 1;
    
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: Product[] = [
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
    const item: CartItem = { ...insertItem, id };
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
}

export const storage = new MemStorage();
