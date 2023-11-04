import "./userNavbar.css";

import DescriptionIcon from "@mui/icons-material/Description";
import Fade from "@mui/material/Fade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import Person4Icon from "@mui/icons-material/Person4";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

function UserNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="bg-white h-20 flex justify-between items-center bg-gradient-to-b from-slate-400 px-10 sticky top-0 z-10">
      <div className="logo button w-96">
        <span className="actual-text">&nbsp;ADAM&nbsp;STORE&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;ADAM&nbsp;STORE&nbsp;
        </span>
      </div>
      <div className="link flex gap-5">
        <NavLink to={'/'} className="sub_link">Home</NavLink>
        <NavLink to={'/products'} className="sub_link">Product</NavLink>
        <NavLink to={'/news'} className="sub_link">New</NavLink>
      </div>
      <div className="info flex justify-end gap-2 w-96">
        <FavoriteIcon className="hover:cursor-pointer" />
        <div>
          <PersonIcon
            className="hover:cursor-pointer"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
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
            <MenuItem onClick={handleClose} className="flex gap-2"><Person4Icon /> <span>Info</span></MenuItem>
            <MenuItem onClick={handleClose} className="flex gap-2"><DescriptionIcon /><span>Order</span></MenuItem>
            <MenuItem onClick={handleClose} className="flex gap-2"><LockIcon /><span>Password</span></MenuItem>
            <MenuItem onClick={handleClose} className="flex gap-2"><LogoutIcon /><span>Logout</span></MenuItem>
          </Menu>
        </div>
        <ShoppingCartIcon className="hover:cursor-pointer" />
      </div>
    </nav>
  );
}

export default UserNavbar;
