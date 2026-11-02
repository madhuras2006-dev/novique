# NOVIQUE — Modern Editorial E-Commerce Platform

NOVIQUE is a high-performance, responsive e-commerce web application designed with a minimalist aesthetic and modern component architecture. Built using **React (Vite)** and **Redux Toolkit**, it provides an intuitive shopping experience featuring product catalog filtering, real-time cart state management, wishlist persistence, multi-gateway checkout, and live order tracking.

---

## Key Features

### 🛍️ Core Shopping Experience
- **Dynamic Product Catalog**: Integrates with the DummyJSON API to fetch, search, filter by category, and sort products in real time.
- **Product Details View**: Dedicated detail pages showcasing high-resolution image previews, pricing breakdown, stock availability, and specifications.
- **Client-Side Pagination**: Efficient catalog browsing with structured page navigation controls.

### 🛒 Shopping Bag & Order Management
- **Full Bag Capabilities**: Dynamic subtotal updates, item quantity adjustments, fee calculations, and persistent state across page reloads.
- **Multi-Gateway Checkout**: Supports Credit/Debit Cards, UPI payments (VPA/QR simulation), and Cash on Delivery (COD).
- **Live Order Tracking**: Interactive step-by-step shipment timeline tracking (`Placed` → `Processing` → `Shipped` → `Out for Delivery` → `Delivered`) backed by local storage persistence.

### 🌟 Bonus Features
- **Wishlist Functionality**: Save favorite products with instant toggle feedback and direct transfer into the shopping bag.
- **Dark Mode**: Minimalist design system powered by CSS custom variables with seamless light/dark theme toggles.
- **Authentication Mockups**: Custom-styled Login and Register client views with input validation state.
- **Local Storage Persistence**: Cart, Wishlist, Theme preferences, and Order history persist across browser sessions.

---

## 🛠️ Tech Stack & System Architecture

- **Frontend Library**: React 18
- **Build Tool**: Vite
- **State Management**: Redux Toolkit (`@reduxjs/toolkit` & `react-redux`)
- **Routing**: React Router DOM (v6)
- **UI & Styling**: CSS-Variable Design System (Flexbox & CSS Grid layouts)
- **Iconography**: Lucide React + Inline SVGs
- **API Integration**: DummyJSON REST API

---

## 📁 Project Directory Structure

```text
novique/
├── public/
├── src/
│   ├── app/
│   │   └── store.js              # Centralized Redux Store Configuration
│   ├── components/
│   │   ├── Footer.jsx            # Footer Component with SVG Brand Icons
│   │   ├── Navbar.jsx            # Header Navigation & Mobile Drawer
│   │   └── ProductCard.jsx       # Reusable Product Display Card
│   ├── features/
│   │   ├── cart/cartSlice.js     # Shopping Bag State Logic
│   │   ├── orders/orderSlice.js  # Order Creation & Tracking State
│   │   ├── products/productSlice.js # Product Catalog & Filter State
│   │   ├── theme/themeSlice.js   # Light/Dark Theme Switcher
│   │   └── wishlist/wishlistSlice.js # Wishlist State Management
│   ├── pages/
│   │   ├── Cart.jsx              # Shopping Bag Overview Page
│   │   ├── Checkout.jsx          # Address Form & Multi-Payment Checkout
│   │   ├── Home.jsx              # Landing Page with Hero & Featured Items
│   │   ├── Login.jsx             # User Authentication Page
│   │   ├── ProductDetails.jsx    # Individual Product Details View
│   │   ├── Register.jsx          # User Registration Page
│   │   ├── Shop.jsx             # Full Catalog, Search & Filtering
│   │   ├── TrackOrder.jsx        # Shipment Timeline Tracker
│   │   └── Wishlist.jsx          # Saved Favorites Screen
│   ├── services/
│   │   └── productService.js     # External API Fetch Service Helpers
│   ├── styles/
│   │   ├── auth.css              # Authentication Form Styles
│   │   ├── global.css            # CSS Design Tokens & Variable Resets
│   │   ├── navbar.css            # Responsive Navigation Bar Styles
│   │   └── shop.css              # Catalog Grid & Filter Sidebar Styles
│   ├── App.jsx                   # Application Layout & Route Registry
│   └── main.jsx                  # React DOM Entry Point & Provider Wrapper
├── index.html
├── package.json
└── vite.config.js
⚙️ Prerequisites, Installation & Execution
1. Prerequisites
Ensure you have the following installed on your local machine:

Node.js (v16.0.0 or higher recommended)

npm (comes packaged with Node.js) or yarn / pnpm

2. Installation & Execution Steps
Open your terminal and follow these commands to run the project locally:
# Clone the repository
git clone [https://github.com/madhuras2006-dev/novique.git](https://github.com/madhuras2006-dev/novique.git)

# Navigate into the project directory
cd novique

# Install all project dependencies
npm install

# Start the local Vite development server
npm run dev