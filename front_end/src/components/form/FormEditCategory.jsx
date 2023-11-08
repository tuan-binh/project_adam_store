import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { put_update_category } from "../../redux/thunk/categoryThunk";
import { useDispatch } from "react-redux";
import { validateBlank } from "../../utils/ValidateForm";

function FormEditCategory({ handleCloseForm, edit }) {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");

  const [errorCategoryName, setErrorCategoryName] = useState("");

  const handleAddCategory = () => {
    const formCategory = {
      categoryName,
      status: true,
    };
    if (validateBlank(formCategory.categoryName)) {
      setErrorCategoryName("you can't blank category name");
      return;
    }
    dispatch(put_update_category({ formCategory, id: edit.id })).then(
      (resp) => {
        if (resp === true) {
          handleCloseForm();
        } else {
          setErrorCategoryName(resp);
        }
      }
    );
  };

  useEffect(() => {
    setCategoryName(edit.categoryName);
  }, []);

  return (
    <TableRow>
      {console.log(edit)}
      <TableCell align="center">
        <CloseIcon onClick={handleCloseForm} />
      </TableCell>
      <TableCell align="center">
        <TextField
          error={errorCategoryName}
          autoFocus
          fullWidth
          size="small"
          label={errorCategoryName ? errorCategoryName : "Category Name"}
          name="categoryName"
          variant="outlined"
          defaultValue={edit.categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </TableCell>
      <TableCell align="center">
        <i className="fa-solid fa-lock-open"></i>
      </TableCell>
      <TableCell align="center">
        <Button variant="contained" onClick={handleAddCategory}>
          ADD
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default FormEditCategory;
