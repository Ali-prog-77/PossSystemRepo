import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Bills from "./pages/Bills";
import Chart from "./pages/Chart";
import ShoppingCart from "./pages/ShoppingCart";
import Customers from "./pages/Customers";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RouteControl>
                <HomePage />
              </RouteControl>
            }
          />
          <Route
            path="/bills"
            element={
              <RouteControl>
                <Bills />
              </RouteControl>
            }
          />
          <Route
            path="/chart"
            element={
              <RouteControl>
                <Chart />
              </RouteControl>
            }
          />
          <Route
            path="/shoppingcart"
            element={
              <RouteControl>
                <ShoppingCart />
              </RouteControl>
            }
          />
          <Route
            path="/customers"
            element={
              <RouteControl>
                <Customers />
              </RouteControl>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products"
            element={
              <RouteControl>
                <Products />
              </RouteControl>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
};
