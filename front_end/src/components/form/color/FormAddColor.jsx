import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { post_add_color } from "../../../redux/thunk/colorThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateBlank } from "../../../utils/ValidateForm";

function FormAddColor({ handleCloseForm }) {
  const dispatch = useDispatch();

  const [colorName, setColorName] = useState("");
  const [errorColorName, setErrorColorName] = useState("");

  const handleAddColor = () => {
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
    dispatch(post_add_color(formColor)).then((resp) => {
      if (resp === true) {
        handleCloseForm();
      } else {
        setErrorColorName(resp);
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
          error={errorColorName}
          autoFocus
          fullWidth
          size="small"
          label={errorColorName ? errorColorName : "Color Name"}
          name="colorName"
          variant="outlined"
          onChange={(e) => setColorName(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <i className="fa-solid fa-lock-open"></i>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={handleAddColor}>
          ADD
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default FormAddColor;
