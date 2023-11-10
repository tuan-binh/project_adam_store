import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CATEGORY } from "../../../redux/selectors/selectors";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { firebase_multiple_upload } from "../../../firebase/firebaseService";
import { post_add_product } from "../../../redux/thunk/productThunk";
import { validateBlank } from "../../../utils/ValidateForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
  display: "flex",
  gap: "10px",
};

function FormAddProduct({ toggle, handleCloseForm, handleLoadProduct }) {
  const dispatch = useDispatch();

  const categories = useSelector(CATEGORY);

  // handle upload images
  const [images, setImages] = useState([]);
  const handleChangeUploadImage = (e) => {
    firebase_multiple_upload(e.target.files).then((resp) => {
      setImages([...images, ...resp]);
    });
  };

  // handle delete image
  const handleDeleteImage = (index) => {
    let newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  // handle select categoryId
  const [categoryId, setCategoryId] = useState(null);
  const handleChangeCategoryId = (event) => {
    setCategoryId(event.target.value);
  };

  const [errorProductName, setErrorProductName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorCategory, setErrorCategory] = useState("");
  const [errorImage, setErrorImage] = useState("");

  const resetError = () => {
    setErrorProductName("");
    setErrorDescription("");
    setErrorCategory("");
    setErrorImage("");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formProduct = {
      productName: e.target.productName.value,
      description: e.target.description.value,
      images: images,
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
    if (formProduct.categoryId === null) {
      setErrorCategory("Category can't blank");
      return;
    }
    if (formProduct.images.length === 0) {
      setErrorImage("Image can't be empty");
      return;
    }

    // dispatch add product
    dispatch(post_add_product(formProduct)).then((resp) => {
      if (resp === true) {
        handleLoadProduct(0);
        handleCloseForm();
      } else {
        setErrorProductName(resp);
      }
    });

    resetError();
  };

  useEffect(() => {
    resetError();
    dispatch(GET_ALL_CATEGORY(""));
  }, []);

  return (
    <Modal
      open={toggle}
      onClose={handleCloseForm}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            width: "300px",
          }}
        >
          <form
            style={{
              border: "1px dashed #000",
              padding: "5px",
              borderRadius: "4px",
            }}
            action=""
            className="flex flex-col gap-2"
            onSubmit={handleAddProduct}
          >
            <TextField
              error={errorProductName}
              label={errorProductName ? errorProductName : "Product Name"}
              variant="filled"
              size="small"
              name="productName"
            />
            <TextField
              error={errorDescription}
              label={errorDescription ? errorDescription : "Description"}
              multiline
              rows={4}
              variant="filled"
              name="description"
            />
            <FormControl fullWidth size="small" error={errorCategory}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Category"
                onChange={handleChangeCategoryId}
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
            <Button type="submit" variant="contained">
              ADD
            </Button>
          </form>
        </Box>
        <Box
          sx={
            errorImage
              ? {
                  width: "436px",
                  border: "2px dashed red",
                  padding: "5px",
                  borderRadius: "4px",
                }
              : {
                  width: "436px",
                  border: "2px dashed #000",
                  padding: "5px",
                  borderRadius: "4px",
                }
          }
          className="bg-slate-100"
        >
          {images.length > 0 ? (
            <div className="flex gap-2 flex-wrap">
              {images.map((item, index) => {
                return (
                  <div key={index} className="relative">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        display: "block",
                        border: "1px solid #000",
                        borderRadius: "4px",
                      }}
                      src={item}
                      alt=""
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="inset-0 absolute flex justify-center items-center opacity-0 hover:cursor-pointer hover:opacity-100 transition-all duration-300"
                      style={{
                        backgroundColor: "rgba(0,0,0,0.4)",
                        borderRadius: "4px",
                      }}
                    >
                      <CloseIcon sx={{ color: "red", fontSize: "30px" }} />
                    </div>
                  </div>
                );
              })}
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  border: "1px dashed #000",
                  borderRadius: "4px",
                }}
                className="flex justify-center items-center bg-white"
              >
                <label htmlFor="images" className="hover:cursor-pointer">
                  <CloudUploadIcon />
                </label>
                <input
                  type="file"
                  name="file"
                  id="images"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleChangeUploadImage}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <label htmlFor="images" className="hover:cursor-pointer">
                <CloudUploadIcon sx={{ fontSize: "70px" }} />
              </label>
              <input
                type="file"
                name="file"
                id="images"
                multiple
                style={{ display: "none" }}
                onChange={handleChangeUploadImage}
              />
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default FormAddProduct;
