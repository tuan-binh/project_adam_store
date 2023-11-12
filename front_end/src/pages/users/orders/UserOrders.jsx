import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import Chip from "@mui/material/Chip";
import FormAddRating from "../../../components/form/rating/FormAddRating";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_ORDER_USER } from "../../../redux/api/service/orderUserService";
import InputLabel from "@mui/material/InputLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuItem from "@mui/material/MenuItem";
import { ORDER_USER } from "../../../redux/selectors/selectors";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import ShowOrderDetail from "../../../components/modal/ShowOrderDetail";
import StarIcon from "@mui/icons-material/Star";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { changeCurrentPage } from "../../../redux/reducers/orderUserSlice";
import { put_cancel_order } from "../../../redux/thunk/orderUserThunk";

function UserOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(ORDER_USER);

  // data orderId
  const [orderId, setOrderId] = useState(null);
  // handle show order detail
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const handleOpenOrderDetail = (id) => {
    setOrderId(id);
    setOpenOrderDetail(true);
  };
  const handleCloseOrderDetail = () => setOpenOrderDetail(false);

  // handle add rating
  const [openAddRating, setOpenAddRating] = useState(false);
  const handleOpenAddRating = (id) => {
    setOrderId(id);
    setOpenAddRating(true);
  };
  const handleCloseAddRating = () => setOpenAddRating(false);

  // handle update rating

  // handle filter by orderStatus
  const [filter, setFilter] = useState("ALL");
  const handleFilterOrder = (event) => {
    setFilter(event.target.value);
  };

  // handle change page
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
  };

  // handle cancel
  const handleCancelOrder = (id) => {
    dispatch(put_cancel_order(id));
  };

  // handle load order
  const handleLoadOrder = () => {
    dispatch(
      GET_ALL_ORDER_USER({ orderStatus: filter, page: orders.current - 1 })
    );
  };

  useEffect(() => {
    handleLoadOrder();
  }, [filter, orders.current]);

  return (
    <>
      <div className="orders mx-60 py-20" style={{ minHeight: "666px" }}>
        <div className="head">
          <h1 className="text-center uppercase text-3xl pb-5">Your Order</h1>
        </div>
        <div className="body">
          <div className="filter w-full flex justify-end">
            <div className="w-52 py-5">
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="Filter"
                  onChange={handleFilterOrder}
                >
                  <MenuItem value={"ALL"}>ALL</MenuItem>
                  <MenuItem value={"PREPARE"}>PREPARE</MenuItem>
                  <MenuItem value={"DELIVERY"}>DELIVERY</MenuItem>
                  <MenuItem value={"SUCCESS"}>SUCCESS</MenuItem>
                  <MenuItem value={"CANCEL"}>CANCEL</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="table w-full">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-slate-200">
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">CUSTOMER</TableCell>
                  <TableCell align="center">LOCATION</TableCell>
                  <TableCell align="center">PHONE</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                  <TableCell align="center">DISCOUNT</TableCell>
                  <TableCell align="center">TIME</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.orders.map((item, index) => {
                  return (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      className="hover:bg-slate-50 hover:cursor-pointer transition-all duration-300"
                    >
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.customer}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.address.toUpperCase()}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.total.toLocaleString()} $
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.coupon === null ? "0" : item.coupon.percent * 100}{" "}
                        %
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.time}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenOrderDetail(item.id)}
                      >
                        {item.orderStatus === "PREPARE" ? (
                          <Chip label={item.orderStatus} color="secondary" />
                        ) : (
                          ""
                        )}
                        {item.orderStatus === "DELIVERY" ? (
                          <Chip label={item.orderStatus} color="primary" />
                        ) : (
                          ""
                        )}
                        {item.orderStatus === "SUCCESS" ? (
                          <Chip label={item.orderStatus} color="success" />
                        ) : (
                          ""
                        )}
                        {item.orderStatus === "CANCEL" ? (
                          <Chip label={item.orderStatus} color="error" />
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {item.orderStatus === "PREPARE" ? (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancelOrder(item.id)}
                          >
                            <Tooltip title="cancel">CANCEL</Tooltip>
                          </Button>
                        ) : (
                          ""
                        )}
                        {item.orderStatus === "DELIVERY" ? (
                          <Tooltip title="delivery">
                            <LocalShippingIcon color="primary" />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                        {item.orderStatus === "SUCCESS" &&
                        item.rating === null ? (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleOpenAddRating(item.id)}
                          >
                            <Tooltip title="rating">RATING</Tooltip>
                          </Button>
                        ) : (
                          item.rating && (
                            <>
                              {item.rating.rate === 1 ? <StarIcon /> : ""}
                              {item.rating.rate === 2 ? (
                                <>
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                </>
                              ) : (
                                ""
                              )}
                              {item.rating.rate === 3 ? (
                                <>
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                </>
                              ) : (
                                ""
                              )}
                              {item.rating.rate === 4 ? (
                                <>
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                </>
                              ) : (
                                ""
                              )}
                              {item.rating.rate === 5 ? (
                                <>
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                  <StarIcon sx={{ color: "#f1c40f" }} />
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          )
                        )}
                        {item.orderStatus === "CANCEL" ? (
                          <Tooltip title="cancel">
                            <CancelIcon color="error" />
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <div className="pagination flex justify-end py-5">
              <Pagination
                count={orders.totalPages}
                page={orders.current}
                color="primary"
                hideNextButton
                hidePrevButton
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
      {openOrderDetail && (
        <ShowOrderDetail
          openOrderDetail={openOrderDetail}
          handleCloseOrderDetail={handleCloseOrderDetail}
          orderId={orderId}
        />
      )}
      {openAddRating && (
        <FormAddRating
          openAddRating={openAddRating}
          handleCloseAddRating={handleCloseAddRating}
          orderId={orderId}
          handleLoadOrder={handleLoadOrder}
        />
      )}
    </>
  );
}

export default UserOrders;
