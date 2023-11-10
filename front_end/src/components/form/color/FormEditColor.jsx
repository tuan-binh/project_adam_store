import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { put_update_color } from "../../../redux/thunk/colorThunk";
import { useDispatch } from "react-redux";
import { validateBlank } from "../../../utils/ValidateForm";

function FormEditColor({ handleCloseForm, edit }) {
  const dispatch = useDispatch();

  const [colorName, setColorName] = useState("");
  const [errorColorName, setErrorColorName] = useState("");

  const handleUpdateColor = () => {
    const formColor = {
      colorName,
      status: true,
    };
    // validate blank
    if (validateBlank(formColor.colorName)) {
      setErrorColorName("Color Name can't blank");
      return;
    }
    // dispatch add color
    dispatch(put_update_color({ formColor, id: edit.id })).then((resp) => {
      if (resp === true) {
        handleCloseForm();
      } else {
        setErrorColorName(resp);
      }
    });
  };

  useEffect(() => {
    setColorName(edit.colorName);
  }, []);

  return (
    <TableRow>
      <TableCell align="center">
        <CloseIcon onClick={handleCloseForm} />
      </TableCell>
      <TableCell align="center">
        <TextField
          error={errorColorName}
          autoFocus
          fullWidth
          size="small"
          label={errorColorName ? errorColorName : "Color Name"}
          variant="outlined"
          defaultValue={edit.colorName}
          onChange={(e) => setColorName(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <i className="fa-solid fa-lock-open"></i>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={handleUpdateColor}>
          UPDATE
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default FormEditColor;
