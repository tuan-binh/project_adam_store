import { Route, Routes } from "react-router-dom";

import AdminHome from "../admin/home/AdminHome";
import AdminLogin from "../login_register/admin/AdminLogin";
import Cart from "../users/cart/Cart";
import Checkout from "../users/checkout/Checkout";
import Contact from "../users/contact/Contact";
import Coupon from "../users/coupon/Coupon";
import Favourite from "../users/favourite/Favourite";
import IndexAdminHome from "../admin/IndexAdminHome";
import IndexUserHome from "../users/IndexUserHome";
import ProductDetail from "../users/products/detail/ProductDetail";
import Products from "../users/products/Products";
import UserHome from "../users/home/UserHome";
import UserLogin from "../login_register/users/UserLogin";
import UserOrders from "../users/orders/UserOrders";
import UserRegister from "../login_register/users/UserRegister";

function Routers() {
  return (
    <Routes>
      {/* user */}
      <Route path="/" Component={IndexUserHome}>
        <Route index Component={UserHome}></Route>
        <Route path="/products" Component={Products}></Route>
        <Route path="/products/detail" Component={ProductDetail}></Route>
        <Route path="/coupon" Component={Coupon}></Route>
        <Route path="/contact" Component={Contact}></Route>
        {/* cart */}
        <Route path="/cart" Component={Cart}></Route>
        {/* favourite */}
        <Route path="/favourite" Component={Favourite}></Route>
        {/* checkout */}
        <Route path="/checkout" Component={Checkout}></Route>
        {/* orders */}
        <Route path="/orders" Component={UserOrders}></Route>
      </Route>
      <Route path="/login" Component={UserLogin}></Route>
      <Route path="/register" Component={UserRegister}></Route>
      {/* admin */}
      <Route path="/admin/login" Component={AdminLogin}></Route>
      {/* home admin */}
      <Route path="/admin" Component={IndexAdminHome}>
        <Route index Component={AdminHome}></Route>
      </Route>
    </Routes>
  );
}

export default Routers;
