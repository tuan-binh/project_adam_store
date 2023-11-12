import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import {
  put_delivery_order,
  put_success_order,
} from "../../../redux/thunk/orderAdminThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_ORDER_ADMIN } from "../../../redux/api/service/orderAdminService";
import InputLabel from "@mui/material/InputLabel";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuItem from "@mui/material/MenuItem";
import { ORDER_ADMIN } from "../../../redux/selectors/selectors";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import ShowOrderDetail from "../../../components/modal/ShowOrderDetail";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { changeCurrentPage } from "../../../redux/reducers/orderAdminSlice";

function ManageOrders() {
  const dispatch = useDispatch();

  const orders = useSelector(ORDER_ADMIN);

  // handle show order detail
  const [orderId, setOrderId] = useState(null);
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const handleOpenOrderDetail = (id) => {
    setOrderId(id);
    setOpenOrderDetail(true);
  };
  const handleCloseOrderDetail = () => setOpenOrderDetail(false);

  // handle filter by orderStatus
  const [filter, setFilter] = useState("ALL");
  const handleFilterOrder = (event) => {
    setFilter(event.target.value);
  };

  // handle change page
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
  };

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // handle delivery
  const handleDeliveryOrderById = (id) => {
    dispatch(put_delivery_order(id));
  };

  // handle success
  const handleSuccessOrderById = (id) => {
    dispatch(put_success_order(id));
  };

  useEffect(() => {
    dispatch(
      GET_ALL_ORDER_ADMIN({
        orderStatus: filter,
        search,
        page: orders.current - 1,
      })
    );
  }, [search, filter, orders.current]);

  return (
    <>
      <div>
        <div className="flex justify-center text-3xl font-semibold uppercase">
          Manage Orders
        </div>
        <div className="content  w-full mt-5 ">
          <div className="header bg-white p-6 shadow-md flex gap-3">
            <FormControl sx={{ width: "200px" }} size="small">
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
            <TextField
              size="small"
              fullWidth
              label="Search"
              name="search"
              variant="outlined"
              onChange={debouncing(handleChangeSearch, TIME_OUT)}
            />
          </div>
          <div className="table w-full mt-5 shadow-md">
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
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
                          {item.address}
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
                          {item.coupon === null
                            ? "0"
                            : item.coupon.percent * 100}{" "}
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
                              color="primary"
                              onClick={() => handleDeliveryOrderById(item.id)}
                            >
                              <Tooltip title="shipping">
                                <LocalShippingIcon />
                              </Tooltip>
                            </Button>
                          ) : (
                            ""
                          )}
                          {item.orderStatus === "DELIVERY" ? (
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleSuccessOrderById(item.id)}
                            >
                              <Tooltip title="success">
                                <CheckCircleIcon />
                              </Tooltip>
                            </Button>
                          ) : (
                            ""
                          )}
                          {item.orderStatus === "SUCCESS" ? (
                            <Tooltip title="success">
                              <CheckCircleIcon color="success" />
                            </Tooltip>
                          ) : (
                            ""
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
            </TableContainer>
          </div>
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
      {openOrderDetail && (
        <ShowOrderDetail
          openOrderDetail={openOrderDetail}
          handleCloseOrderDetail={handleCloseOrderDetail}
          orderId={orderId}
        />
      )}
    </>
  );
}

export default ManageOrders;
