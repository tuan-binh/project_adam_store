import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { put_update_info_user } from "../../redux/thunk/userThunk";
import { useDispatch } from "react-redux";
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

function Information({ openInformation, handleCloseInformation }) {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  // error
  const [errorFullName, setErrorFullName] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const resetError = () => {
    setErrorFullName("");
    setErrorAddress("");
    setErrorPhone("");
  };

  // handle update information
  const handleUpdateInformation = (e) => {
    e.preventDefault();
    const formUpdate = {
      fullName: e.target.fullName.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
    };
    // validate
    if (validateBlank(formUpdate.fullName)) {
      setErrorFullName("fullName can't be blank");
      return;
    }
    if (validateBlank(formUpdate.address)) {
      setErrorAddress("address can't be blank");
      return;
    }
    if (validateBlank(formUpdate.phone)) {
      setErrorPhone("phone can't be blank");
      return;
    }
    // dispatch
    dispatch(put_update_info_user(formUpdate)).then((resp) => {
      if (resp === true) {
        resetError();
        handleCloseInformation();
      } else {
        setErrorPhone(resp);
      }
    });
  };

  return (
    <Modal
      open={openInformation}
      onClose={handleCloseInformation}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h1 className="uppercase text-center py-3 font-semibold text-lg">
          Information
        </h1>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleUpdateInformation}
        >
          <TextField
            error={errorFullName}
            label={errorFullName ? errorFullName : "FullName"}
            variant="filled"
            size="small"
            name="fullName"
            defaultValue={user.fullName}
            fullWidth
          />
          <TextField
            label="Email"
            variant="filled"
            size="small"
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <TextField
            error={errorAddress}
            label={errorAddress ? errorAddress : "Address"}
            variant="filled"
            size="small"
            name="address"
            defaultValue={user.address}
            fullWidth
          />
          <TextField
            error={errorPhone}
            label={errorPhone ? errorPhone : "Phone"}
            variant="filled"
            size="small"
            name="phone"
            type="number"
            defaultValue={user.phone}
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

export default Information;
