import { MenuProvider } from "./context/MenuContext";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext";
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import PageTop from "./components/PageTop";
import Modal from "./components/reuseables/Modal";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import OrderCompletionPage from "./pages/OrderComplete";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import Footer from "./components/Footer";

//Admin pages
import AdminHome from "./pages/Admin/Home";
import Menu from "./pages/Admin/Menu";
import Orders from "./pages/Admin/Orders";
import MenuItems from "./pages/Admin/MenuItems";

//Auth pages
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

// Protected Route for Admin
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading, user } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('user:', user)
  return isLoggedIn && user ? children : <Navigate to="/diadem/login" />;
};

function App() {
  return (
    <div className="app-container">
      <Router>
        <ToastContainer />
        <PageTop />

        <AuthProvider>
          <Routes>
            {/* Login & Signup Routes */}
            <Route path="/diadem/signup" element={<Signup />} />
            <Route path="/diadem/login" element={<Login />} />

            {/* Main App Routes (with Navbar and Footer) */}
            <Route
              path="*"
              element={
                <MenuProvider>
                  <CartProvider>
                    <ModalProvider>
                      <OrderProvider>
                        <>
                          <Navbar />
                          <div className="content">
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route
                                path="/order-complete"
                                element={<OrderCompletionPage />}
                              />
                              <Route path="/about" element={<AboutPage />} />
                              <Route path="/contact" element={<ContactPage />} />
                            </Routes>
                          </div>
                          <Modal />
                          <Footer />
                        </>
                      </OrderProvider>
                    </ModalProvider>
                  </CartProvider>
                </MenuProvider>
              }
            />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin/*"
              element={
                <AdminProvider>
                  <ProtectedRoute>
                    <AdminRoutes />
                  </ProtectedRoute>
                </AdminProvider>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

// Nested Admin Routes
const AdminRoutes = () => {
  return (
    <div className="py-10">
      <Routes>
        <Route path="" element={<AdminHome />} />
        <Route path="menu-items" element={<MenuItems />} />
        <Route path="add-item" element={<Menu />} />
        <Route path="all-orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
