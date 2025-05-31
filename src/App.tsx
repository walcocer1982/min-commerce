import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/cartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex justify-between items-center h-16">
                <Link to="/" className="text-xl font-bold text-amber-500">
                  Min-Commerce
                </Link>
                <div className="flex gap-6">
                  <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors"
                  >
                    Productos
                  </Link>
                  <Link
                    to="/cart"
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 transition-colors"
                  >
                    Carrito
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
