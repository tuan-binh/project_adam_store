import {
  delete_cartItem,
  delete_clear_all,
  get_cart_user,
  put_change_quantity_cartItem,
} from "../../../redux/thunk/userThunk";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { USER } from "../../../redux/selectors/selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(USER);

  // handle minus quantity
  const handleMinusCartItem = (idCartItem, quantity) => {
    if (quantity === 1) {
      handleRemoveCartItem(idCartItem);
    } else {
      dispatch(
        put_change_quantity_cartItem({ idCartItem, quantity: quantity - 1 })
      );
    }
  };

  // handle change quantity input
  const handleChangeQuantity = (e, idCartItem, stock) => {
    let quantity = e.target.value;
    if (quantity > stock) {
      dispatch(put_change_quantity_cartItem({ idCartItem, quantity: stock }));
    } else if (quantity < 0) {
      dispatch(put_change_quantity_cartItem({ idCartItem, quantity: 1 }));
    } else {
      dispatch(put_change_quantity_cartItem({ idCartItem, quantity }));
    }
  };

  // handle plus quantity
  const handlePlusCartItem = (idCartItem, quantity, stock) => {
    if (quantity < stock) {
      dispatch(
        put_change_quantity_cartItem({ idCartItem, quantity: quantity + 1 })
      );
    }
  };

  // handle remove cartItem
  const handleRemoveCartItem = (idCartItem) => {
    dispatch(delete_cartItem(idCartItem));
  };

  // handle clear all
  const handleClearAll = () => {
    dispatch(delete_clear_all());
  };

  // handle next to check out
  const handleCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(get_cart_user());
  }, []);

  return (
    <div className="mx-60 py-20">
      {console.log(user.cart)}
      <div className="flex gap-10">
        <div className="flex-1" style={{ minHeight: "490px" }}>
          <div className="flex justify-end py-2">
            <Button variant="contained" color="error" onClick={handleClearAll}>
              clear
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-slate-200">
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">COLOR</TableCell>
                <TableCell align="center">SIZE</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">QUANTITY</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.cart.map((item, index) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {item.productDetail.product.productName.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      {item.productDetail.color.colorName}
                    </TableCell>
                    <TableCell align="center">
                      {item.productDetail.size.sizeName}
                    </TableCell>
                    <TableCell align="center">
                      {item.productDetail.price.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <div className="quantity flex justify-center items-center gap-4">
                        <p
                          className="bg-slate-200 p-2 rounded-full flex items-center justify-center w-7 h-7 hover:cursor-pointer"
                          onClick={() =>
                            handleMinusCartItem(item.id, item.quantity)
                          }
                        >
                          <i className="fa-solid fa-minus"></i>
                        </p>
                        <p>
                          <input
                            type="text"
                            value={item.quantity}
                            onClick={(e) => e.target.select()}
                            onChange={(e) =>
                              handleChangeQuantity(
                                e,
                                item.id,
                                item.productDetail.stock
                              )
                            }
                            style={{
                              width: "30px",
                              textAlign: "center",
                              outline: "none",
                              borderBottom: "2px solid blue",
                            }}
                          />
                        </p>
                        <p
                          className="bg-slate-200 p-2 rounded-full flex items-center justify-center w-7 h-7 hover:cursor-pointer"
                          onClick={() =>
                            handlePlusCartItem(
                              item.id,
                              item.quantity,
                              item.productDetail.stock
                            )
                          }
                        >
                          <i className="fa-solid fa-plus"></i>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      {(
                        item.quantity * item.productDetail.price
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleRemoveCartItem(item.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="relative w-1/4">
          <div className="sticky top-10 bg-slate-200 px-10 pt-10 pb-5 rounded-lg shadow-lg">
            <h1 className="text-center uppercase font-semibold text-xl">
              Your Bill
            </h1>
            <div className="py-5 border-b-2 border-black border-dashed">
              <h2>
                <b style={{ minWidth: "100px", display: "inline-block" }}>
                  Quantity :
                </b>{" "}
                <span>
                  {user.cart.reduce((sum, item) => (sum += item.quantity), 0)}
                </span>
              </h2>
              <h2>
                <b style={{ minWidth: "100px", display: "inline-block" }}>
                  Total :
                </b>{" "}
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
              </h2>
            </div>
            <div className="actions py-5">
              <Button
                variant="contained"
                disabled={user.cart.length === 0}
                fullWidth
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
