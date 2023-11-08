import { CATEGORY, PRODUCT } from "../../../redux/selectors/selectors";
import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
import { GET_ALL_PRODUCT } from "../../../redux/api/service/productService";
import InputLabel from "@mui/material/InputLabel";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { changeCurrentPage } from "../../../redux/reducers/productSlice";

function ManageProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(CATEGORY);
  const products = useSelector(PRODUCT);

  // handle filter category
  const [category, setCategory] = useState("ALL");
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // handle change page
  const [page, setPage] = useState(products.current || 1);
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
    setPage(value);
  };

  useEffect(() => {
    dispatch(GET_ALL_CATEGORY(""));
    dispatch(GET_ALL_PRODUCT({ search, category, page: page - 1 }));
  }, [search, category, page]);

  return (
    <div>
      {console.log(products)}
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Products
      </div>
      <div className="flex justify-end">
        <div className="add_manager">
          <Button variant="contained" className="flex gap-2">
            <WidgetsIcon /> <span>ADD PRODUCT</span>
          </Button>
        </div>
      </div>
      <div className="content  w-full mt-5 ">
        <div className="header bg-white p-6 shadow-md flex gap-3">
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label"> Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Filter"
              onChange={handleChangeCategory}
              size="small"
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              {categories.categories.map((item) => (
                <MenuItem key={item.id} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              ))}
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
                  <TableCell align="left">PRODUCT NAME</TableCell>
                  <TableCell align="left">DESCRIPTION</TableCell>
                  <TableCell align="center">IMAGE</TableCell>
                  <TableCell align="center">CATEGORY</TableCell>
                  <TableCell align="center">STATUS</TableCell>
                  <TableCell align="center">ACTIONS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.products.map((item, index) => {
                  return (
                    <TableRow
                      key={item?.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                      className="hover:bg-slate-100 transition-all duration-300"
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="left">
                        {item.productName.toUpperCase()}
                      </TableCell>
                      <TableCell align="left">{item.description}</TableCell>
                      <TableCell align="center">
                        <img
                          src={item.image}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            display: "block",
                            margin: "0 auto",
                            borderRadius: "5px",
                          }}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">
                        {item.category.categoryName}
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
        <div className="pagination flex justify-end py-5">
          <Pagination
            count={products.totalPages}
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

export default ManageProduct;
