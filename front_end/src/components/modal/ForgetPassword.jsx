import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import instance from "../../redux/api/axios";

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

function ForgetPassword({ openForgetPassword, handleCloseForgetPassword }) {
  const [success, setSuccess] = useState("");

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", e.target.email.value);
    await instance.put("/api/user/forget/password", formData).then((resp) => {
      if (resp.status === 200) {
        setSuccess(resp.data + " Please check message your email!");
      } else {
        handleCloseForgetPassword();
        Swal.fire({
          title: "Good job!",
          text: resp.data,
          icon: "error",
          showCloseButton: true,
          cancelButtonColor: "#27ae60",
          cancelButtonText: "OK",
        });
      }
    });
  };

  useEffect(() => {
    setSuccess("");
  }, []);

  return (
    <Modal
      open={openForgetPassword}
      onClose={handleCloseForgetPassword}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="uppercase text-center py-3 font-semibold text-lg">
          forget password
        </h1>
        <p className="text-center text-green-600 pb-2">{success}</p>
        <form action="" onSubmit={handleForgetPassword}>
          <TextField
            sx={{ paddingBottom: "15px" }}
            id="filled-basic"
            label="Email"
            variant="filled"
            size="small"
            name="email"
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Confirm
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default ForgetPassword;
