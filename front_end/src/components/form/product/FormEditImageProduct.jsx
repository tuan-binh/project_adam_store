import {
  delete_image_product,
  put_add_image_product,
} from "../../../redux/thunk/productThunk";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Modal from "@mui/material/Modal";
import { firebase_multiple_upload } from "../../../firebase/firebaseService";
import { useDispatch } from "react-redux";
import { useState } from "react";

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
  flexDirection: "column",
  gap: "10px",
};

function FormEditImageProduct({
  openEditImage,
  handleCloseEditImage,
  editImage,
}) {
  const dispatch = useDispatch();

  // handle upload images
  const [newListImage, setNewListImage] = useState([]);

  const [images, setImages] = useState(
    editImage.imageResponses.map((item) => item.url)
  );
  const handleChangeUploadImage = (e) => {
    firebase_multiple_upload(e.target.files).then((resp) => {
      setImages([...images, ...resp]);
      setNewListImage([...newListImage, ...resp]);
    });
  };

  // handle delete image
  const handleDeleteImage = (item, index) => {
    let check = editImage.imageResponses.map((item) => item.url).indexOf(item);
    if (check != -1) {
      let copyImages = [...images];
      copyImages.splice(index, 1);
      setImages(copyImages);
      dispatch(
        delete_image_product({
          idImage: editImage.imageResponses.find((e) => e.url === item).id,
          idProduct: editImage.id,
        })
      );
    } else {
      let copyImages = [...images];
      copyImages.splice(index, 1);
      setImages(copyImages);
      let copyNewListImage = [...newListImage];
      copyNewListImage.splice(copyNewListImage.indexOf(item), 1);
      setNewListImage(copyNewListImage);
    }
  };

  // handle upload image API
  const handleUpdateImage = () => {
    const formImageProduct = {
      images: newListImage,
    };
    dispatch(put_add_image_product({ formImageProduct, id: editImage.id }));
    handleCloseEditImage();
  };

  return (
    <Modal
      open={openEditImage}
      onClose={handleCloseEditImage}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {console.log(editImage)}
        <Box
          sx={{
            width: "438px",
            border: "2px dashed #000",
            padding: "5px",
            borderRadius: "4px",
          }}
          className="bg-slate-100"
        >
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
                    onClick={() => handleDeleteImage(item, index)}
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
        </Box>
        <Button variant="contained" fullWidth onClick={handleUpdateImage}>
          UPDATE
        </Button>
      </Box>
    </Modal>
  );
}

export default FormEditImageProduct;
