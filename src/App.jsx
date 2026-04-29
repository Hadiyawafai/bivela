import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";

import Home from "./features/home/HomePage.jsx";
import AuthPage from "./features/auth/AuthPage.jsx";
import ShopPage from "./features/shop/Shop.jsx";
import AtelierPage from "./features/atelier/AtelierPage.jsx";
import HeritagePage from "./features/heritage/HeritagePage.jsx";
import SearchPage from "./features/search/SearchPage.jsx";
import CarePage from "./features/care/CarePage.jsx";
import CartPage from "./features/cart/CartPage.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="min-h-screen">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* IMPORTANT FIX */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Other Pages */}
          <Route path="/heritage" element={<HeritagePage />} />
          <Route path="/atelier" element={<AtelierPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;