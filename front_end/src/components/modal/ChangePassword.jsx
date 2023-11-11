import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { handle_logout } from "../../redux/thunk/authThunk";
import { put_change_password_user } from "../../redux/thunk/userThunk";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateBlank } from "../../utils/ValidateForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  px: 2,
  pb: 4,
  pt: 1,
};

function ChangePassword({ openPassword, handleClosePassword }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // error
  const [errorOldPassword, setErrorOldPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const resetError = () => {
    setErrorOldPassword("");
    setErrorNewPassword("");
    setErrorConfirmPassword("");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    const formPassword = {
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    };
    // validate
    if (validateBlank(formPassword.oldPassword)) {
      setErrorOldPassword("old password can't be blank");
      return;
    }
    if (validateBlank(formPassword.newPassword)) {
      setErrorNewPassword("new password can't be blank");
      return;
    }
    if (validateBlank(e.target.confirmPassword.value)) {
      setErrorConfirmPassword("confirm password can't be blank");
      return;
    }
    if (formPassword.newPassword !== e.target.confirmPassword.value) {
      setErrorNewPassword("passwords do not match");
      setErrorConfirmPassword("passwords do not match");
      return;
    }
    // dispatch
    console.log(formPassword);
    dispatch(put_change_password_user(formPassword)).then((resp) => {
      handleClosePassword();
      if (resp === true) {
        Swal.fire({
          title: "Good job!",
          text: "Thay đổi mật khẩu thành công!",
          icon: "success",
          showCloseButton: true,
          cancelButtonColor: "#27ae60",
          cancelButtonText: "OK",
        }).then(() => {
          navigate("/");
          dispatch(handle_logout());
        });
      } else {
        setErrorOldPassword(resp);
      }
    });
    resetError();
  };

  return (
    <Modal
      open={openPassword}
      onClose={handleClosePassword}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="uppercase text-center py-3 font-semibold text-lg">
          Change password
        </h1>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleChangePassword}
        >
          <TextField
            error={errorOldPassword}
            label={errorOldPassword ? errorOldPassword : "Old Password"}
            variant="filled"
            size="small"
            name="oldPassword"
            fullWidth
          />
          <TextField
            error={errorNewPassword}
            label={errorNewPassword ? errorNewPassword : "New Password"}
            variant="filled"
            size="small"
            name="newPassword"
            fullWidth
          />
          <TextField
            error={errorConfirmPassword}
            label={
              errorConfirmPassword ? errorConfirmPassword : "Confirm Password"
            }
            variant="filled"
            size="small"
            name="confirmPassword"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            update
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ChangePassword;
