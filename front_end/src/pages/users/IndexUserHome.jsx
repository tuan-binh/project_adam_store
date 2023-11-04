import Footer from "../../components/footer/Footer";
import { Outlet } from "react-router-dom";
import UserNavbar from "../../components/navbar/UserNavbar";

function IndexUserHome() {
  return (
    <div>
      <UserNavbar />
      <div style={{ minHeight: 'calc(100vh - 80px)', height: 'calc(100vh - 80px)', overflowX: "hidden", overflowY: 'auto' }}>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default IndexUserHome;
