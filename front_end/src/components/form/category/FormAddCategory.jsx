import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import { post_add_category } from "../../../redux/thunk/categoryThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { validateBlank } from "../../../utils/ValidateForm";

function FormAddCategory({ handleCloseForm }) {
  const dispatch = useDispatch();

  const [categoryName, setCategoryName] = useState("");

  const [errorCategoryName, setErrorCategoryName] = useState("");

  const handleAddCategory = () => {
    const formCategory = {
      categoryName,
      status: true,
    };
    // validate blank
    if (validateBlank(formCategory.categoryName)) {
      setErrorCategoryName("you can't blank category name");
      return;
    }
    // dispatch add new category
    dispatch(post_add_category(formCategory)).then((resp) => {
      if (resp === true) {
        handleCloseForm();
      } else {
        setErrorCategoryName(resp);
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
          error={errorCategoryName}
          autoFocus
          fullWidth
          size="small"
          label={errorCategoryName ? errorCategoryName : "Category Name"}
          name="categoryName"
          variant="outlined"
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

export default FormAddCategory;
