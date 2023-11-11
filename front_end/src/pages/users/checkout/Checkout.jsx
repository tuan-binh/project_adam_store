import "./checkout.css";

import { COUPON, USER } from "../../../redux/selectors/selectors";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { GET_ALL_COUPON } from "../../../redux/api/service/couponService";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import { get_cart_user } from "../../../redux/thunk/userThunk";
import { useEffect } from "react";
import { useState } from "react";
import { validateBlank } from "../../../utils/ValidateForm";

function Checkout() {
  const dispatch = useDispatch();

  const coupons = useSelector(COUPON);
  const user = useSelector(USER);
  const dataLogin = JSON.parse(localStorage.getItem("user"));

  // handle change infor order
  const [customer, setCustomer] = useState(dataLogin.fullName);
  const handleChangeCustomer = (e) => setCustomer(e.target.value);
  const [address, setAddress] = useState(dataLogin.address);
  const handleChangeAddress = (e) => setAddress(e.target.value);
  const [phone, setPhone] = useState(dataLogin.phone);
  const handleChangePhone = (e) => setPhone(e.target.value);

  // handle select address
  const [optionOrder, setOptionOrder] = useState("your_address");
  const handleSelectOption = (e) => {
    setOptionOrder(e.target.value);
    if (e.target.value === "different_address") {
      setCustomer("");
      setAddress("");
      setPhone("");
    } else {
      setCustomer(dataLogin.fullName);
      setAddress(dataLogin.address || "");
      setPhone(dataLogin.phone || "");
    }
  };

  // handle select coupon
  const [coupon, setCoupon] = useState(null);
  const handleSelectCoupon = (item) => {
    setSearch("");
    setCoupon(item);
  };

  // handle delete coupon
  const handleDeleteCoupon = () => {
    setCoupon(null);
  };

  // handle search coupon
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // error
  const [errorCustomer, setErrorCustomer] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const resetError = () => {
    setErrorCustomer("");
    setErrorAddress("");
    setErrorPhone("");
  };

  // handle order cart user
  const handleOrderCartUser = () => {
    const formCheckout = {};
    if (coupon) {
      formCheckout.coupon = coupon.id;
    }
    if (optionOrder === "your_address") {
      if (!address || !phone) {
        Swal.fire({
          title: "Good job!",
          text: "Vui lòng cập nhật thông tin!",
          icon: "error",
          showCloseButton: true,
          cancelButtonColor: "#27ae60",
          cancelButtonText: "OK",
        });
        return;
      }
    } else {
      if (validateBlank(customer)) {
        setErrorCustomer("Customer name can't be blank");
        return;
      }
      if (validateBlank(address)) {
        setErrorAddress("Address can't be blank");
        return;
      }
      if (validateBlank(phone)) {
        setErrorPhone("Phone can't be blank");
        return;
      }
      formCheckout.customer = customer;
      formCheckout.address = address;
      formCheckout.phone = phone;
    }
    // dispatch order user
    resetError();
  };

  useEffect(() => {
    resetError();
    dispatch(get_cart_user());
    dispatch(GET_ALL_COUPON(""));
  }, [search]);

  return (
    <div className="mx-60 py-20">
      <div className="flex gap-10">
        <div className="w-3/5 bg-slate-100 px-10 py-5 shadow-2xl rounded-lg">
          <div className="flex justify-between items-center py-2 border-b-2 border-black border-dashed">
            <h2 className="uppercase text-2xl">Address</h2>
            <div className="actions">
              <div className="radio-input-wrapper">
                <label className="label">
                  <input
                    value="your_address"
                    name="check_with_address"
                    id="value-2"
                    className="radio-input"
                    type="radio"
                    onChange={handleSelectOption}
                    defaultChecked
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Your Address</div>
                </label>
                <label className="label">
                  <input
                    value="different_address"
                    name="check_with_address"
                    id="value-3"
                    className="radio-input"
                    type="radio"
                    onChange={handleSelectOption}
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Different Address</div>
                </label>
              </div>
            </div>
          </div>
          <div className="body pt-20 flex flex-col gap-5">
            <TextField
              error={errorCustomer}
              label={errorCustomer ? errorCustomer : "Customer"}
              variant="outlined"
              value={customer}
              InputProps={{
                readOnly: optionOrder === "your_address",
              }}
              onChange={handleChangeCustomer}
              fullWidth
            />
            <TextField
              error={errorAddress}
              label={errorAddress ? errorAddress : "Address"}
              variant="outlined"
              value={address}
              InputProps={{
                readOnly: optionOrder == "your_address",
              }}
              onChange={handleChangeAddress}
              fullWidth
            />
            <TextField
              error={errorPhone}
              label={errorPhone ? errorPhone : "Phone"}
              variant="outlined"
              value={phone}
              InputProps={{
                readOnly: optionOrder == "your_address",
              }}
              type="number"
              onChange={handleChangePhone}
              fullWidth
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 ">
          <div
            className="bg-slate-100 px-10 py-5 shadow-2xl rounded-lg"
            style={{ minHeight: "300px" }}
          >
            <h2 className="uppercase text-2xl py-2 border-b-2 border-black border-dashed">
              <b>Coupon</b>
            </h2>
            <div className="relative body py-3">
              <TextField
                id="filled-basic"
                fullWidth
                size="small"
                label="Search"
                variant="outlined"
                value={search}
                onChange={handleChangeSearch}
              />
              {search && (
                <div className="absolute w-10/12 right-1/2 translate-x-1/2 mt-2 p-3 shadow-xl bg-white rounded-lg">
                  {coupons.coupons.map((item) => {
                    if (item.status) {
                      return (
                        <div
                          key={item.id}
                          className="body bg-slate-200 h-28 rounded-lg px-5 py-3 shadow-xl hover:cursor-pointer"
                          onClick={() => handleSelectCoupon(item)}
                        >
                          <div className="head flex justify-between">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <LocalActivityIcon sx={{ color: "red" }} />
                              <span>{item.coupon}</span>
                            </h3>
                            <h3>
                              <b className="uppercase">stock :</b>{" "}
                              <span>{item.stock}</span>
                            </h3>
                          </div>
                          <div className="body">
                            <p>
                              <b className="uppercase">Persent :</b>{" "}
                              <span>{item.percent} %</span>
                            </p>
                          </div>
                          <div className="flex justify-between items-end">
                            <p>
                              <b className="uppercase">Date : </b>
                              <span>{item.startDate}</span>
                              <span> - </span>
                              <span>{item.endDate}</span>
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
            {coupon && (
              <div className="body bg-white h-28 mt-4 rounded-lg px-5 py-3 shadow-xl">
                <div className="head flex justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <LocalActivityIcon sx={{ color: "red" }} />
                    <span>{coupon.coupon}</span>
                  </h3>
                  <h3>
                    <b className="uppercase">stock :</b>{" "}
                    <span>{coupon.stock}</span>
                  </h3>
                </div>
                <div className="body">
                  <p>
                    <b className="uppercase">Persent :</b>{" "}
                    <span>{coupon.percent}%</span>
                  </p>
                </div>
                <div className="flex justify-between items-end">
                  <p>
                    <b className="uppercase">Date : </b>
                    <span>{coupon.startDate}</span>
                    <span> - </span>
                    <span>{coupon.endDate}</span>
                  </p>
                  <DeleteIcon
                    className="hover:cursor-pointer text-2xl text-red-600"
                    onClick={handleDeleteCoupon}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="bg-slate-100 px-10 py-5 shadow-2xl rounded-lg">
            <h2 className="uppercase text-2xl py-2 border-b-2 border-black border-dashed">
              <b>Detail</b>
            </h2>
            <div className="body py-3">
              {/* products */}
              <div className="products border-b-2 pb-5 border-black border-dashed">
                <h3>
                  <b className="uppercase">Products :</b>
                </h3>
                <div className="list">
                  {user.cart.map((item) => {
                    return (
                      <p key={item.id} className="flex justify-between">
                        <span>
                          <TurnRightIcon />{" "}
                          {item.productDetail.product.productName}
                        </span>
                        <span>
                          {(
                            item.productDetail.price * item.quantity
                          ).toLocaleString()}{" "}
                          $
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
              {/* totals */}
              <div className="total_before  border-b-2 py-5 border-black border-dashed">
                <p className="flex justify-between">
                  <span>
                    <b>SubTotal </b>
                  </span>
                  <span>
                    {user.cart
                      .reduce(
                        (sum, item) =>
                          (sum += item.quantity * item.productDetail.price),
                        0
                      )
                      .toLocaleString()}{" "}
                    $
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>
                    <b>Discount </b>
                  </span>
                  <span>{coupon ? coupon.percent : 0} %</span>
                </p>
              </div>
              <div className="total_after">
                <p className="flex justify-between items-center py-5">
                  <span className="uppercase font-semibold text-2xl">
                    Total
                  </span>
                  <span>
                    {coupon
                      ? (
                          user.cart.reduce(
                            (sum, item) =>
                              (sum += item.quantity * item.productDetail.price),
                            0
                          ) *
                          ((100 - coupon.percent) / 100)
                        ).toLocaleString()
                      : user.cart
                          .reduce(
                            (sum, item) =>
                              (sum += item.quantity * item.productDetail.price),
                            0
                          )
                          .toLocaleString()}
                    $
                  </span>
                </p>
              </div>
              {/* check out */}
              <div>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleOrderCartUser}
                >
                  Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
