import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

const ProductsList = lazy(() => import("./pages/ProductsList"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Register = lazy(() => import("./pages/Register"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Suspense fallback={<div className="text-center"><h3>Loading...</h3></div>}>
          <Routes>
            <Route path="/" element={<ProductsList />} />
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
