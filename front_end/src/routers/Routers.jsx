import { Route, Routes } from "react-router-dom";

import AdminLogin from "../pages/login_register/admin/AdminLogin";
import IndexUserHome from "../pages/users/home/IndexUserHome";
import UserLogin from "../pages/login_register/users/UserLogin";
import UserRegister from "../pages/login_register/users/UserRegister";

function Routers() {
  return (
    <Routes>
      {/* user */}
      <Route path="/" Component={IndexUserHome}></Route>
      <Route path="/login" Component={UserLogin}></Route>
      <Route path="/register" Component={UserRegister}></Route>
      {/* admin */}
      <Route path="/admin/login" Component={AdminLogin}></Route>
    </Routes>
  );
}

export default Routers;
