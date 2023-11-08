import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import {
  disabledEditItem,
  enableEditItem,
} from "../../../redux/reducers/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { CATEGORY } from "../../../redux/selectors/selectors";
import CategoryIcon from "@mui/icons-material/Category";
import EditIcon from "@mui/icons-material/Edit";
import FormAddCategory from "../../../components/form/FormAddCategory";
import FormEditCategory from "../../../components/form/FormEditCategory";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
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
import { put_status_category } from "../../../redux/thunk/categoryThunk";

function ManageCategory() {
  const dispatch = useDispatch();
  const categories = useSelector(CATEGORY);

  const [toggle, setToggle] = useState(false);
  const handleCreateForm = () => setToggle(true);
  const handleCloseForm = () => setToggle(false);

  const handleEditCatgory = (id) => {
    dispatch(enableEditItem(id));
  };

  const handleChangeStatusShip = (id) => {
    dispatch(put_status_category(id));
  };

  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    dispatch(GET_ALL_CATEGORY(search));
  }, [search]);

  return (
    <div>
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Category
      </div>
      <div className="flex justify-end">
        <div className="add_manager">
          <Button
            variant="contained"
            className="flex gap-2"
            onClick={handleCreateForm}
          >
            <CategoryIcon /> <span>ADD CATEGORY</span>{" "}
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
                  <TableCell align="center">CATEGORY NAME</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toggle && (
                  <FormAddCategory handleCloseForm={handleCloseForm} />
                )}
                {categories.categories.map((item, index) => {
                  if (item?.isEdit) {
                    return (
                      <FormEditCategory
                        key={item.id}
                        handleCloseForm={() => dispatch(disabledEditItem())}
                        edit={item}
                      />
                    );
                  } else {
                    return (
                      <TableRow
                        key={item?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">
                          <p className="text-blue-700 uppercase underline hover:cursor-pointer">
                            {item?.categoryName.toUpperCase()}
                          </p>
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
                              <Button
                                onClick={() => handleEditCatgory(item?.id)}
                                variant="contained"
                                color="warning"
                              >
                                <Tooltip title="edit">
                                  <EditIcon />
                                </Tooltip>
                              </Button>
                              <Button
                                onClick={() => handleChangeStatusShip(item?.id)}
                                variant="contained"
                                color="error"
                              >
                                <Tooltip title="lock">
                                  <LockOutlinedIcon />
                                </Tooltip>
                              </Button>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleChangeStatusShip(item?.id)}
                              variant="contained"
                              color="success"
                            >
                              <Tooltip title="unlock">
                                <LockOpenOutlinedIcon />
                              </Tooltip>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default ManageCategory;
