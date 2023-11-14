import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { GET_ALL_USER } from "../../../redux/api/service/userAdminService";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { USERS_ADMIN } from "../../../redux/selectors/selectors";
import { changeCurrentPage } from "../../../redux/reducers/userAdminSlice";
import { put_status_user } from "../../../redux/thunk/userAdminThunk";

function ManageUsers() {
  const dispatch = useDispatch();

  const users = useSelector(USERS_ADMIN);

  // handle change status
  const handleChangeStatus = (id) => {
    dispatch(put_status_user(id));
  };

  // handle change page
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
  };

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    dispatch(GET_ALL_USER({ search, page: users.current - 1 }));
  }, [search, users.current]);

  return (
    <div>
      {console.log(users)}
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Users
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
                  <TableCell align="center">FULLNAME</TableCell>
                  <TableCell align="center">EMAIL</TableCell>
                  <TableCell align="center">ADDRESS</TableCell>
                  <TableCell align="center">PHONE</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.users.map((item, index) => (
                  <TableRow
                    key={item?.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{item.fullName}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">
                      {item.roles.includes("ROLE_ADMIN")
                        ? "ADMIN"
                        : item.address}
                    </TableCell>
                    <TableCell align="center">
                      {item.roles.includes("ROLE_ADMIN") ? "ADMIN" : item.phone}
                    </TableCell>
                    <TableCell align="center">
                      {item.status ? (
                        <i className="fa-solid fa-lock-open"></i>
                      ) : (
                        <i className="fa-solid fa-lock"></i>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {item.roles.includes("ROLE_ADMIN") ? (
                        "ADMIN"
                      ) : item.status ? (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleChangeStatus(item.id)}
                        >
                          <Tooltip title="lock">
                            <LockOutlinedIcon />
                          </Tooltip>
                        </Button>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="pagination flex justify-end py-5">
          <Pagination
            count={users.totalPages}
            page={users.current}
            color="primary"
            hideNextButton
            hidePrevButton
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
