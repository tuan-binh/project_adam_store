import {
  formatDate,
  formatDateToInput,
  numberPercent,
  numberStock,
  validateBlank,
  validateDate,
} from "../../../utils/ValidateForm";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { put_update_coupon } from "../../../redux/thunk/couponThunk";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "8px",
  p: 2,
};

function FormEditCoupon({ toggleEdit, handleCloseEdit, edit }) {
  const dispatch = useDispatch();

  const [errorCouponName, setErrorCouponName] = useState("");
  const [errorPercent, setErrorPercent] = useState("");
  const [errorStock, setErrorStock] = useState("");
  const [errorDate, setErrorDate] = useState("");

  const formatError = () => {
    setErrorCouponName("");
    setErrorPercent("");
    setErrorStock("");
    setErrorDate("");
  };

  const handleUpdateCoupon = (e) => {
    e.preventDefault();

    const formCoupon = {
      coupon: e.target.coupon.value,
      percent: e.target.percent.value,
      stock: e.target.stock.value,
      startDate: e.target.created.value,
      endDate: e.target.dueDate.value,
      status: true,
    };

    console.log(formCoupon);

    // validate
    // validate blank
    if (validateBlank(formCoupon.coupon)) {
      setErrorCouponName("coupon name can't blank");
      return;
    }
    if (validateBlank(formCoupon.percent)) {
      setErrorPercent("percent can't blank");
      return;
    }
    if (validateBlank(formCoupon.stock)) {
      setErrorStock("stock can't blank");
      return;
    }
    if (
      validateBlank(formCoupon.startDate) ||
      validateBlank(formCoupon.endDate)
    ) {
      setErrorDate("date can't blank");
      return;
    }
    // validate value
    if (numberPercent(formCoupon.percent)) {
      setErrorPercent("percent must be than 0");
      return;
    }
    if (numberStock(formCoupon.stock)) {
      setErrorStock("stock must be than 0");
      return;
    }
    if (validateDate(formCoupon.startDate, formCoupon.endDate)) {
      setErrorDate("date malformed");
      return;
    }
    // dispatch actions
    dispatch(
      put_update_coupon({
        formCoupon: {
          ...formCoupon,
          startDate: formatDate(formCoupon.startDate),
          endDate: formatDate(formCoupon.endDate),
        },
        id: edit.id,
      })
    ).then((resp) => {
      if (resp === true) {
        handleCloseEdit();
      } else {
        setErrorCouponName(resp);
      }
    });
    // format error
    formatError();
  };

  useEffect(() => {
    formatError();
  }, []);

  return (
    <Modal
      open={toggleEdit}
      onClose={handleCloseEdit}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          action=""
          className="flex flex-col gap-2"
          onSubmit={handleUpdateCoupon}
        >
          <TextField
            error={errorCouponName}
            name="coupon"
            label={errorCouponName ? errorCouponName : "Coupon Name"}
            variant="filled"
            size="small"
            defaultValue={edit.coupon}
          />
          <TextField
            error={errorPercent}
            name="percent"
            label={errorPercent ? errorPercent : "Percent"}
            variant="filled"
            size="small"
            type="number"
            defaultValue={edit.percent}
          />
          <TextField
            error={errorStock}
            name="stock"
            label={errorStock ? errorStock : "Stock"}
            variant="filled"
            size="small"
            type="number"
            defaultValue={edit.stock}
          />
          <div style={{ display: "flex", width: "100%", gap: "10px" }}>
            <TextField
              error={errorDate}
              size="small"
              label={errorDate ? errorDate : "Created Date"}
              color="secondary"
              focused
              name="created"
              type="date"
              sx={{ flex: 1, margin: "10px 0" }}
              defaultValue={formatDateToInput(edit.startDate)}
            />
            <TextField
              error={errorDate}
              size="small"
              label={errorDate ? errorDate : "Expiration Date"}
              color="secondary"
              focused
              name="dueDate"
              type="date"
              sx={{ flex: 1, margin: "10px 0" }}
              defaultValue={formatDateToInput(edit.endDate)}
            />
          </div>
          <Button type="submit" variant="contained">
            UPDATE
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default FormEditCoupon;
