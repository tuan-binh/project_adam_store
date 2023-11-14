import { Route, Routes } from "react-router-dom";

import AdminHome from "../admin/home/AdminHome";
import Cart from "../users/cart/Cart";
import Checkout from "../users/checkout/Checkout";
import Contact from "../users/contact/Contact";
import Coupon from "../users/coupon/Coupon";
import Favourite from "../users/favourite/Favourite";
import IndexAdminHome from "../admin/IndexAdminHome";
import IndexUserHome from "../users/IndexUserHome";
import ManageCategory from "../admin/products/ManageCategory";
import ManageColor from "../admin/products/ManageColor";
import ManageCoupon from "../admin/coupon/ManageCoupon";
import ManageOrders from "../admin/orders/ManageOrders";
import ManageProduct from "../admin/products/ManageProduct";
import ManageSize from "../admin/products/ManageSize";
import ManageUsers from "../admin/users/ManageUsers";
import ProductDetail from "../users/products/detail/ProductDetail";
import Products from "../users/products/Products";
import UserHome from "../users/home/UserHome";
import UserLogin from "../login_register/UserLogin";
import UserOrders from "../users/orders/UserOrders";
import UserRegister from "../login_register/UserRegister";

function Routers() {
  return (
    <Routes>
      {/* user */}
      <Route path="/" Component={IndexUserHome}>
        {/* home page */}
        <Route index Component={UserHome}></Route>
        {/* show list product */}
        <Route path="/products/" Component={Products}></Route>
        {/* show product detail */}
        <Route path="/products/detail/:id" Component={ProductDetail}></Route>
        {/* show coupon */}
        <Route path="/coupon" Component={Coupon}></Route>
        {/* show contact */}
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
      {/* home admin */}
      <Route path="/admin" Component={IndexAdminHome}>
        {/* dashboard */}
        <Route index Component={AdminHome}></Route>
        {/* orders */}
        <Route path="/admin/orders" Component={ManageOrders}></Route>
        {/* products */}
        <Route path="/admin/category" Component={ManageCategory}></Route>
        <Route path="/admin/product" Component={ManageProduct}></Route>
        <Route path="/admin/color" Component={ManageColor}></Route>
        <Route path="/admin/size" Component={ManageSize}></Route>
        {/* coupon */}
        <Route path="/admin/coupon" Component={ManageCoupon}></Route>
        {/* users */}
        <Route path="/admin/users" Component={ManageUsers}></Route>
      </Route>
    </Routes>
  );
}

export default Routers;
