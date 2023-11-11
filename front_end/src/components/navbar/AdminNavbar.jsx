import Chip from "@mui/material/Chip";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { handle_logout } from "../../redux/thunk/authThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AdminNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleShowMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("active");
    dispatch(handle_logout());
    handleClose();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        height: "45px",
        padding: "0 15px",
        position: "sticky",
        top: "0",
        zIndex: "10",
        background: "#fff",
      }}
      className="shadow-xl"
    >
      <Chip
        sx={{
          padding: "15px 5px",
          fontSize: "18px",
          minWidth: "130px",
          borderRadius: "999px",
        }}
        label={user.fullName}
        color="primary"
        component="a"
        clickable
        onClick={handleShowMenu}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          marginTop: "10px",
          ".MuiList-root": {
            width: "130px",
            padding: "0",
          },
        }}
      >
        <MenuItem className="flex gap-2" onClick={handleLogout}>
          <LogoutIcon /> Log out
        </MenuItem>
      </Menu>
    </div>
  );
}

export default AdminNavbar;
