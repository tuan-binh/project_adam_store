import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { post_add_size } from "../../../redux/thunk/sizeThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateBlank } from "../../../utils/ValidateForm";

function FormAddSize({ handleCloseForm }) {
  const dispatch = useDispatch();

  const [sizeName, setSizeName] = useState("");
  const [errorSizeName, setErrorSizeName] = useState("");
  const handleAddSize = () => {
    const formSize = {
      sizeName,
      status: true,
    };
    // vadlidate blank
    if (validateBlank(formSize.sizeName)) {
      setErrorSizeName("Size Name can't blank");
      return;
    }
    // dispatch add size
    dispatch(post_add_size(formSize)).then((resp) => {
      if (resp === true) {
        handleCloseForm();
      } else {
        setErrorSizeName(resp);
      }
    });
  };

  return (
    <TableRow>
      <TableCell align="center">
        <CloseIcon onClick={handleCloseForm} />
      </TableCell>
      <TableCell align="center">
        <TextField
          error={errorSizeName}
          autoFocus
          fullWidth
          size="small"
          label={errorSizeName ? errorSizeName : "Size Name"}
          name="sizeName"
          variant="outlined"
          onChange={(e) => setSizeName(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <i className="fa-solid fa-lock-open"></i>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={handleAddSize}>
          ADD
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default FormAddSize;
