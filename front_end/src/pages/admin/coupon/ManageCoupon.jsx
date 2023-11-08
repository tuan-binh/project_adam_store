import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { COUPON } from "../../../redux/selectors/selectors";
import EditIcon from "@mui/icons-material/Edit";
import FormAddCoupon from "../../../components/form/FormAddCoupon";
import FormEditCoupon from "../../../components/form/FormEditCoupon";
import { GET_ALL_COUPON } from "../../../redux/api/service/couponService";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { put_status_coupon } from "../../../redux/thunk/couponThunk";

function ManageCoupon() {
  const dispatch = useDispatch();

  const coupons = useSelector(COUPON);

  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // handle open add
  const [toggleAdd, setToggleAdd] = useState(false);
  const handleOpenAdd = () => setToggleAdd(true);
  const handleCloseAdd = () => setToggleAdd(false);

  // handle open edit
  const [edit, setEdit] = useState(null);
  const [toggleEdit, setToggleEdit] = useState(false);
  const handleOpenEdit = (item) => {
    setEdit(item);
    setToggleEdit(true);
  };
  const handleCloseEdit = () => setToggleEdit(false);

  // handle change status
  const handleChangeStatus = (id) => {
    dispatch(put_status_coupon(id));
  };

  useEffect(() => {
    dispatch(GET_ALL_COUPON(search));
  }, [search]);

  return (
    <div>
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Coupon
      </div>
      <div className="flex justify-end">
        <div className="add_manager">
          <Button
            variant="contained"
            className="flex gap-2"
            onClick={handleOpenAdd}
          >
            <LocalActivityIcon /> <span>ADD COUPON</span>
          </Button>
        </div>
      </div>
      <div className="content  w-full mt-5 ">
        <div className="header bg-white p-6 shadow-md">
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
                  <TableCell align="center">COUPON NAME</TableCell>
                  <TableCell align="center">PERCENT</TableCell>
                  <TableCell align="center">CREATED DATE</TableCell>
                  <TableCell align="center">EXPIRATION DATE</TableCell>
                  <TableCell align="center">STOCK</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.coupons.map((item, index) => {
                  return (
                    <TableRow
                      key={item?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.coupon}</TableCell>
                      <TableCell align="center">{item.percent} % </TableCell>
                      <TableCell align="center">{item.startDate}</TableCell>
                      <TableCell align="center">{item.endDate}</TableCell>
                      <TableCell align="center">{item.stock}</TableCell>
                      <TableCell align="center">
                        {item?.status ? (
                          <i className="fa-solid fa-lock-open"></i>
                        ) : (
                          <i className="fa-solid fa-lock"></i>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {item.status ? (
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="contained"
                              color="warning"
                              onClick={() => handleOpenEdit(item)}
                            >
                              <Tooltip title="edit">
                                <EditIcon />
                              </Tooltip>
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleChangeStatus(item.id)}
                            >
                              <Tooltip title="lock">
                                <LockOutlinedIcon />
                              </Tooltip>
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleChangeStatus(item.id)}
                          >
                            <Tooltip title="un lock">
                              <LockOpenOutlinedIcon />
                            </Tooltip>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {toggleAdd && (
        <FormAddCoupon toggleAdd={toggleAdd} handleCloseAdd={handleCloseAdd} />
      )}
      {toggleEdit && (
        <FormEditCoupon
          toggleEdit={toggleEdit}
          handleCloseEdit={handleCloseEdit}
          edit={edit}
        />
      )}
    </div>
  );
}

export default ManageCoupon;
