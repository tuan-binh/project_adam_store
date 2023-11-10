import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { put_update_size } from "../../../redux/thunk/sizeThunk";
import { useDispatch } from "react-redux";
import { validateBlank } from "../../../utils/ValidateForm";

function FormEditSize({ handleCloseForm, edit }) {
  const dispatch = useDispatch();

  const [sizeName, setSizeName] = useState("");
  const [errorSizeName, setErrorSizeName] = useState("");

  const handleUpdateSize = () => {
    const formSize = {
      sizeName,
      status: true,
    };
    // validate blank
    if (validateBlank(formSize.sizeName)) {
      setErrorSizeName("Size Name can't blank");
      return;
    }
    // dispatch update
    dispatch(put_update_size({ formSize, id: edit.id })).then((resp) => {
      if (resp === true) {
        handleCloseForm();
      } else {
        setErrorSizeName(resp);
      }
    });
  };

  useEffect(() => {
    setSizeName(edit.sizeName);
  }, []);

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
          variant="outlined"
          defaultValue={edit.sizeName}
          onChange={(e) => setSizeName(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <i className="fa-solid fa-lock-open"></i>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={handleUpdateSize}>
          UPDATE
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default FormEditSize;
