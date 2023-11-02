import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import UserNavbar from "../../components/navbar/UserNavbar";

function IndexUserHome() {
  return (
    <div>
      <UserNavbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default IndexUserHome;
