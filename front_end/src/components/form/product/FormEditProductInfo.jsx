import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CATEGORY } from "../../../redux/selectors/selectors";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { put_update_product } from "../../../redux/thunk/productThunk";
import { validateBlank } from "../../../utils/ValidateForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 350,
  borderRadius: "8px",
  p: 2,
};

function FormEditProductInfo({ openEditInfo, handleCloseEditInfo, editInfo }) {
  const dispatch = useDispatch();

  const categories = useSelector(CATEGORY);

  // handle select categoryId
  const [categoryId, setCategoryId] = useState(editInfo.category.id);
  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
  };

  const [errorProductName, setErrorProductName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  const resetError = () => {
    setErrorProductName("");
    setErrorDescription("");
  };

  const handleUpdateProductInfo = (e) => {
    e.preventDefault();
    const formProduct = {
      productName: e.target.productName.value,
      description: e.target.description.value,
      categoryId: categoryId,
      status: true,
    };
    // validate
    if (validateBlank(formProduct.productName)) {
      setErrorProductName("Product Name can't blank");
      return;
    }
    if (validateBlank(formProduct.description)) {
      setErrorDescription("Description can't blank");
      return;
    }
    // dispatch update product
    dispatch(put_update_product({ formProduct, id: editInfo.id })).then(
      (resp) => {
        if (resp === true) {
          handleCloseEditInfo();
        } else {
          setErrorProductName(resp);
        }
      }
    );
    resetError();
  };

  useEffect(() => {
    resetError();
    dispatch(GET_ALL_CATEGORY(""));
  }, []);

  return (
    <Modal
      open={openEditInfo}
      onClose={handleCloseEditInfo}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={handleUpdateProductInfo}
        >
          <TextField
            error={errorProductName}
            label={errorProductName ? errorProductName : "Product Name"}
            variant="filled"
            size="small"
            name="productName"
            defaultValue={editInfo.productName}
            fullWidth
          />
          <TextField
            error={errorDescription}
            label={errorDescription ? errorDescription : "Description"}
            multiline
            rows={4}
            variant="filled"
            name="description"
            defaultValue={editInfo.description}
            fullWidth
          />
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              label="Category"
              onChange={handleChangeCategoryId}
              defaultValue={editInfo.category.id}
              autoFocus
            >
              {categories.categories.map((item) => {
                if (item.status) {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.categoryName}
                    </MenuItem>
                  );
                }
              })}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" fullWidth>
            UPDATE
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default FormEditProductInfo;
