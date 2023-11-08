import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { COLOR } from "../../../redux/selectors/selectors";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import EditIcon from "@mui/icons-material/Edit";
import { GET_ALL_COLOR } from "../../../redux/api/service/colorService";
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

function ManageColor() {
  const dispatch = useDispatch();

  const colors = useSelector(COLOR);

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    dispatch(GET_ALL_COLOR(search));
  }, [search]);

  return (
    <div>
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Color
      </div>
      <div className="flex justify-end">
        <div className="add_manager">
          <Button variant="contained" className="flex gap-2">
            <ColorLensIcon /> <span>ADD COLOR</span>
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
                  <TableCell align="center">COLOR NAME</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colors.colors.map((item, index) => {
                  return (
                    <TableRow
                      key={item?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {item.colorName.toUpperCase()}
                      </TableCell>
                      <TableCell align="center">
                        {item?.status ? (
                          <i className="fa-solid fa-lock-open"></i>
                        ) : (
                          <i className="fa-solid fa-lock"></i>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {item?.status ? (
                          <div className="flex gap-2 justify-center">
                            <Button variant="contained" color="warning">
                              <Tooltip title="edit">
                                <EditIcon />
                              </Tooltip>
                            </Button>
                            <Button variant="contained" color="error">
                              <Tooltip title="lock">
                                <LockOutlinedIcon />
                              </Tooltip>
                            </Button>
                          </div>
                        ) : (
                          <Button variant="contained" color="success">
                            <Tooltip title="unlock">
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
    </div>
  );
}

export default ManageColor;
