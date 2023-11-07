import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { GlobalState } from "../../GlobalState";

import DetailProduct from "./detailProduct/DetailProduct";

import Login from "./auth/Login";
import Register from "./auth/Register";

import CreateProduct from "./createProduct/CreateProduct";
import Configurations from "./configurations/Configurations";

import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";

import Categories from "./categories/Categories";

import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";

import NotFound from "./utils/not_found/NotFound";
import Payment from "./checkout/payment/Payment";

import Home from "./home/Home";

import AboutUs from "./aboutUs/AboutUs";
import Contact from "./contact/Contact";
import Stores from "./stores/Stores";
import Users from "./users/Users";
import CreditPage from "./credit/CreditPage";
import Category from "./category/Category";
import Subcategory from "./subcategory/Subcategory";
import SecSubcategory from "./secSubcategory/SecSubcategory";
import AllProducts from "./allProducts/AllProducts";
import Offers from "./offers/Offers";

function Pages(props) {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isSuperAdmin] = state.userAPI.isSuperAdmin;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<AllProducts />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/offers" element={<Offers />} />

      <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />

      <Route
        path="/category"
        element={isAdmin || isSuperAdmin ? <Categories /> : <NotFound />}
      />
      <Route path="/category/:id" element={<Category />} />
      <Route path="/subcategory/:id" element={<Subcategory />} />
      <Route path="/secsubcategory/:id" element={<SecSubcategory />} />

      <Route
        path="/create_product"
        element={isAdmin || isSuperAdmin ? <CreateProduct /> : <NotFound />}
      />
      <Route
        path="/configurations"
        element={isAdmin || isSuperAdmin ? <Configurations /> : <NotFound />}
      />
      <Route
        path="/users"
        element={isAdmin || isSuperAdmin ? <Users /> : <NotFound />}
      ></Route>
      <Route
        path="/edit_products/:id"
        element={isAdmin || isSuperAdmin ? <CreateProduct /> : <NotFound />}
      />

      <Route
        path="/history"
        element={isLogged ? <OrderHistory /> : <NotFound />}
      />
      <Route
        path="/history/:id"
        element={isLogged ? <OrderDetails /> : <NotFound />}
      />

      <Route
        path="/checkout"
        element={isLogged ? <Checkout /> : <NotFound />}
      />
      <Route
        path="/checkout/payment/:id"
        element={isLogged ? <Payment /> : <NotFound />}
      />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<NotFound />} />

      <Route path="/credit" element={<CreditPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/stores" element={<Stores />} />
    </Routes>
  );
}

export default Pages;
