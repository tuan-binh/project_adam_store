import { COLOR, SIZE } from "../../../redux/selectors/selectors";
import {
  numberPrice,
  numberStock,
  validateBlank,
} from "../../../utils/ValidateForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_COLOR } from "../../../redux/api/service/colorService";
import { GET_ALL_SIZE } from "../../../redux/api/service/sizeService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { post_add_product_detail } from "../../../redux/thunk/productThunk";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
};

function FormAddProductDetail({
  toggleAdd,
  handleCloseAddProductDetail,
  productId,
  setListProductDetail,
}) {
  const dispatch = useDispatch();

  const colors = useSelector(COLOR);
  const sizes = useSelector(SIZE);

  // handle select color
  const [sizeId, setSizeId] = useState(null);
  const handleSelectSizeId = (event) => {
    setSizeId(event.target.value);
  };

  // handle select size
  const [colorId, setColorId] = useState(null);
  const handleSelectColorId = (event) => {
    setColorId(event.target.value);
  };

  // error
  const [errorPrice, setErrorPrice] = useState("");
  const [errorStock, setErrorStock] = useState("");
  const [errorSize, setErrorSize] = useState("");
  const [errorColor, setErrorColor] = useState("");

  const resetError = () => {
    setErrorPrice("");
    setErrorStock("");
    setErrorSize("");
    setErrorColor("");
  };

  // handle add product detail
  const handleAddProductDetail = (e) => {
    e.preventDefault();
    const formProductDetail = {
      price: e.target.price.value,
      stock: e.target.stock.value,
      sizeId: sizeId,
      colorId: colorId,
      status: true,
    };
    // validate
    if (validateBlank(formProductDetail.price)) {
      setErrorPrice("price can't blank");
      return;
    }
    if (validateBlank(formProductDetail.stock)) {
      setErrorStock("stock can't blank");
      return;
    }
    if (sizeId === null) {
      setErrorSize("size can't be null");
      return;
    }
    if (colorId === null) {
      setErrorColor("color can't be null");
      return;
    }
    if (numberPrice(formProductDetail.price)) {
      setErrorPrice("price must be than 0");
      return;
    }
    if (numberStock(formProductDetail.stock)) {
      setErrorStock("stock must be than 0");
      return;
    }
    // dispatch
    dispatch(
      post_add_product_detail({ formProductDetail, idProduct: productId })
    ).then((resp) => {
      setListProductDetail(resp.productDetailResponses);
      handleCloseAddProductDetail();
    });
    resetError();
  };

  useEffect(() => {
    resetError();
    dispatch(GET_ALL_COLOR(""));
    dispatch(GET_ALL_SIZE(""));
  }, []);

  return (
    <Modal
      open={toggleAdd}
      onClose={handleCloseAddProductDetail}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleAddProductDetail}
        >
          <TextField
            error={errorPrice}
            name="price"
            label={errorPrice ? errorPrice : "Price"}
            variant="filled"
            size="small"
            type="number"
            fullWidth
          />
          <TextField
            error={errorStock}
            name="stock"
            label={errorStock ? errorStock : "Stock"}
            variant="filled"
            size="small"
            type="number"
            fullWidth
          />
          <div className="flex gap-2">
            <FormControl fullWidth size="small" error={errorSize}>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sizeId}
                label="Size"
                onChange={handleSelectSizeId}
              >
                {sizes.sizes.map((item) => {
                  if (item.status) {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.sizeName}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth size="small" error={errorColor}>
              <InputLabel id="demo-simple-select-label">Color</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={colorId}
                label="Color"
                onChange={handleSelectColorId}
              >
                {colors.colors.map((item) => {
                  if (item.status) {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.colorName}
                      </MenuItem>
                    );
                  }
                })}
              </Select>
            </FormControl>
          </div>
          <Button type="submit" variant="contained" fullWidth>
            ADD
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default FormAddProductDetail;
