import "./userNavbar.css";

import { NavLink, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import ChangePassword from "../modal/ChangePassword";
import DescriptionIcon from "@mui/icons-material/Description";
import Fade from "@mui/material/Fade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Information from "../modal/Information";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Person4Icon from "@mui/icons-material/Person4";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import { handle_logout } from "../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";

function UserNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle show information
  const [openInformation, setOpenInformation] = useState(false);
  const handleOpenInformation = () => {
    setOpenInformation(true);
    handleClose();
  };
  const handleCloseInformation = () => setOpenInformation(false);
  // handle show password
  const [openPassword, setOpenPassword] = useState(false);
  const handleOpenPassword = () => {
    setOpenPassword(true);
    handleClose();
  };
  const handleClosePassword = () => setOpenPassword(false);

  // handle favourite
  const handleFavourite = () => {
    navigate("/favourite");
    handleClose();
  };

  // handle show orders
  const handleNavigateToOrders = () => {
    navigate("/orders");
    handleClose();
  };

  // handle logout
  const handleLogout = () => {
    navigate("/");
    dispatch(handle_logout());
    handleClose();
  };

  return (
    <>
      <nav className="h-20 flex justify-between items-center bg-gradient-to-b from-slate-400 px-10 sticky top-0 z-10">
        <div className="logo button w-96" onClick={() => navigate("/")}>
          <span className="actual-text">&nbsp;ADAM&nbsp;STORE&nbsp;</span>
          <span aria-hidden="true" className="hover-text">
            &nbsp;ADAM&nbsp;STORE&nbsp;
          </span>
        </div>
        <div className="link flex gap-5">
          <NavLink to={"/"} className="sub_link">
            Home
          </NavLink>
          <NavLink to={"/products"} className="sub_link">
            Product
          </NavLink>
          <NavLink to={"/coupon"} className="sub_link">
            Coupon
          </NavLink>
          <NavLink to={"/contact"} className="sub_link">
            Contact
          </NavLink>
        </div>
        <div className="info flex justify-end gap-2 w-96">
          {user ? (
            <>
              <div>
                <Tooltip title={user.fullName} placement="left">
                  <PersonIcon
                    className="hover:cursor-pointer"
                    id="fade-button"
                    aria-controls={open ? "fade-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  />
                </Tooltip>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                  sx={{
                    marginTop: "10px",
                    ".MuiList-root": {
                      width: "150px",
                      padding: "0",
                    },
                  }}
                >
                  <MenuItem
                    onClick={handleOpenInformation}
                    className="flex gap-2"
                  >
                    <Person4Icon /> <span>Info</span>
                  </MenuItem>
                  <MenuItem onClick={handleFavourite} className="flex gap-2">
                    <FavoriteIcon />
                    <span>Favourite</span>
                  </MenuItem>
                  <MenuItem
                    onClick={handleNavigateToOrders}
                    className="flex gap-2"
                  >
                    <DescriptionIcon />
                    <span>Order</span>
                  </MenuItem>
                  <MenuItem onClick={handleOpenPassword} className="flex gap-2">
                    <LockIcon />
                    <span>Password</span>
                  </MenuItem>
                  <MenuItem onClick={handleLogout} className="flex gap-2">
                    <LogoutIcon />
                    <span>Logout</span>
                  </MenuItem>
                </Menu>
              </div>
              <ShoppingCartIcon
                onClick={() => navigate("/cart")}
                className="hover:cursor-pointer"
              />
            </>
          ) : (
            <>
              <Button
                variant="text"
                sx={{ color: "#2c3e50", "&:hover": { color: "#34495e" } }}
                onClick={() => navigate("/register")}
              >
                SIGN UP
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#2c3e50", "&:hover": { bgcolor: "#34495e" } }}
                onClick={() => navigate("/login")}
              >
                SIGN IN
              </Button>
            </>
          )}
        </div>
      </nav>
      {openInformation && (
        <Information
          openInformation={openInformation}
          handleCloseInformation={handleCloseInformation}
        />
      )}
      {openPassword && (
        <ChangePassword
          openPassword={openPassword}
          handleClosePassword={handleClosePassword}
        />
      )}
    </>
  );
}

export default UserNavbar;
