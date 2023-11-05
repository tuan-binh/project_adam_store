import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

function ForgetPassword({ openForgetPassword, handleCloseForgetPassword }) {
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
        <form action="">
          <TextField
            sx={{ paddingBottom: "15px" }}
            id="filled-basic"
            label="Email"
            variant="filled"
            size="small"
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
