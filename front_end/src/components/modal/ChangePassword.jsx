import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

function ChangePassword({ openPassword, handleClosePassword }) {
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
      open={openPassword}
      onClose={handleClosePassword}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="uppercase text-center py-3 font-semibold text-lg">
          Change password
        </h1>
        <form action="" className="flex flex-col gap-3">
          <TextField
            id="filled-basic"
            label="Old Password"
            variant="filled"
            size="small"
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="New Password"
            variant="filled"
            size="small"
            fullWidth
          />
          <TextField
            id="filled-basic"
            label="Confirm Password"
            variant="filled"
            size="small"
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
