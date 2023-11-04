import { Route, Routes } from "react-router-dom";

import AdminLogin from "../pages/login_register/admin/AdminLogin";
import IndexUserHome from "../pages/users/IndexUserHome";
import News from "../pages/users/news/News";
import ProductDetail from "../pages/users/products/detail/ProductDetail";
import Products from "../pages/users/products/Products";
import UserHome from "../pages/users/home/UserHome";
import UserLogin from "../pages/login_register/users/UserLogin";
import UserRegister from "../pages/login_register/users/UserRegister";

function Routers() {
  return (
    <Routes>
      {/* user */}
      <Route path="/" Component={IndexUserHome}>
        <Route index Component={UserHome}></Route>
        <Route path="/products" Component={Products}></Route>
        <Route path="/products/detail" Component={ProductDetail}></Route>
        <Route path="/news" Component={News}></Route>
      </Route>
      <Route path="/login" Component={UserLogin}></Route>
      <Route path="/register" Component={UserRegister}></Route>
      {/* admin */}
      <Route path="/admin/login" Component={AdminLogin}></Route>
    </Routes>
  );
}

export default Routers;
