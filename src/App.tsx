import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import FloatingCartButton from "./components/FloatingCartButton";
import Homepage from "./pages/Homepage";
import Shop from "./pages/Shop";

import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Awareness from "./pages/Awareness";
import AboutUs from "./pages/AboutUs";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy";
import CancellationRefund from "./pages/CancellationRefund";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/products" element={<Shop />} />

                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/awareness" element={<Awareness />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />
                  <Route path="/cancellation-refund" element={<CancellationRefund />} />
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <FloatingCartButton />
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
