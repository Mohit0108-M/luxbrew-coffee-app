# LuxBrew - Premium Coffee Shop Web Application

A fully responsive, luxurious web application for LuxBrew, a premium coffee shop brand. Built with modern web technologies and designed with a mobile-first approach featuring an elegant cream, beige, and gold color palette.

## 🌟 Features

### 🎯 Core Functionality
- **Complete E-commerce Experience** - Browse products, add to cart, wishlist management
- **Product Categories** - Coffee drinks, matcha, cupcakes, pastries, and snacks
- **Responsive Design** - Mobile-first approach with elegant UI components
- **Shopping Cart** - Full cart management with quantity controls and pricing
- **Wishlist** - Save favorite products for later
- **User Profiles** - Personalized user experience

### 🎨 Design System
- **Luxury Color Palette** - Cream white, light beige, light gold, rich brown, coffee tan
- **Premium Typography** - Playfair Display for headings, Poppins for body text
- **Mobile-First Design** - Optimized for all screen sizes
- **Smooth Animations** - Elegant transitions and interactions

### 📱 Pages & Navigation
- **Splash Screen** - Welcome page with brand introduction
- **Home Page** - Featured products and category browsing
- **Products Page** - Complete product catalog with filtering
- **Product Details** - Detailed product information with size selection
- **Shopping Cart** - Cart management with Indian pricing (₹)
- **Wishlist** - Saved products management
- **Profile Page** - User account information

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **TanStack React Query** for server state management
- **Zustand** for global state management
- **Radix UI** components with custom styling
- **Tailwind CSS** for styling
- **Vite** for build tooling

### Backend
- **Node.js** with Express.js
- **TypeScript** with ESM modules
- **PostgreSQL** with Drizzle ORM (configured)
- **In-memory storage** (current implementation)
- **RESTful API** design

### Development Tools
- **Vite** development server with HMR
- **ESLint & TypeScript** for code quality
- **Replit** deployment platform

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/luxbrew-coffee-app.git
   cd luxbrew-coffee-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5000`
   - The app will automatically reload on code changes

### Environment Setup
The application is configured to work out of the box. For database integration:
- Set `DATABASE_URL` environment variable for PostgreSQL
- Run `npm run db:push` to sync database schema

## 📁 Project Structure

```
luxbrew-coffee-app/
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and configurations
│   │   ├── App.tsx         # Main application component
│   │   └── index.css       # Global styles and Tailwind
│   └── index.html          # HTML entry point
├── server/
│   ├── routes.ts           # API route handlers
│   ├── storage.ts          # Data storage interface
│   ├── index.ts            # Express server setup
│   └── db.ts               # Database configuration
├── shared/
│   └── schema.ts           # Shared TypeScript types
└── package.json            # Dependencies and scripts
```

## 🎯 Key Features Breakdown

### Product Catalog
- **16 Premium Products** across 5 categories
- **Coffee Drinks** - Espresso, Latte, Cappuccino, Americano, Mocha
- **Matcha Selection** - Premium and iced matcha drinks
- **Baked Goods** - Cupcakes, pastries, and artisan snacks
- **Indian Pricing** - All prices in Indian Rupees (₹279-₹639)

### Shopping Experience
- **Size Selection** - Small, Medium, Large options for beverages
- **Quantity Management** - Easy quantity adjustment in cart
- **Price Calculation** - Automatic total calculation with GST (18%)
- **Delivery Integration** - ₹49 delivery fee structure

### Technical Highlights
- **TypeScript** - Full type safety across frontend and backend
- **React Query** - Efficient data fetching and caching
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Modern UI** - Clean, intuitive interface with smooth animations

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Sync database schema (when using PostgreSQL)
- `npm run lint` - Run ESLint for code quality

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/popular` - Get popular products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Wishlist
- `GET /api/wishlist` - Get wishlist items
- `POST /api/wishlist` - Add item to wishlist
- `DELETE /api/wishlist/:id` - Remove wishlist item

## 🎨 Design Guidelines

### Color Palette
- **Cream White** - `#faf9f7` - Primary background
- **Light Beige** - `#f5f2e9` - Secondary background
- **Light Gold** - `#d4af37` - Accent and highlights
- **Rich Brown** - `#5d4037` - Primary text and buttons
- **Coffee Tan** - `#8d6e63` - Secondary elements

### Typography
- **Headings** - Playfair Display (400, 600, 700)
- **Body Text** - Poppins (300, 400, 500, 600)
- **Mobile-First** - Responsive font sizes and spacing

## 🚀 Deployment

### Replit Deployment
The application is optimized for Replit deployment:
1. Import repository to Replit
2. Run `npm install` to install dependencies
3. Use `npm run dev` to start the application
4. Deploy using Replit's deployment features

### Production Build
For other platforms:
```bash
npm run build
```
Static files will be generated in the `dist` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality product images
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **React Query** - Powerful data synchronization for React

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**LuxBrew** - *Where luxury meets your daily coffee ritual* ☕✨