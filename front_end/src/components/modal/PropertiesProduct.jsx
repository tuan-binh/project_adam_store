import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function PropertiesProduct({ openProperties, handleCloseProperties }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  return (
    <Modal
      open={openProperties}
      onClose={handleCloseProperties}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-wrap">
          <div className="w-1/2">
            <img
              src="https://theme.hstatic.net/1000333436/1001040510/14/vendor_value_4.jpg?v=142"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://theme.hstatic.net/1000333436/1001040510/14/vendor_value_3.jpg?v=142"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://theme.hstatic.net/1000333436/1001040510/14/vendor_value_2.jpg?v=142"
              alt=""
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://theme.hstatic.net/1000333436/1001040510/14/vendor_value_1.jpg?v=142"
              alt=""
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default PropertiesProduct;
