import React, { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  Router,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Layout from "./layout";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import Products from "./components/Products";

function App() {
  function Redirect({ children }) {
    let user = JSON.parse(localStorage.getItem("user")) ?? false;

    return user ? children : <Navigate to="/login" />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* public routes */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/layout"
          element={
            <Redirect>
              <Layout />
            </Redirect>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="products" element={<Products />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
