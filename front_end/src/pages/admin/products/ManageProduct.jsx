import { CATEGORY, PRODUCT } from "../../../redux/selectors/selectors";
import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FilterIcon from "@mui/icons-material/Filter";
import FormAddProduct from "../../../components/form/product/FormAddProduct";
import FormControl from "@mui/material/FormControl";
import FormEditImageProduct from "../../../components/form/product/FormEditImageProduct";
import FormEditProductInfo from "../../../components/form/product/FormEditProductInfo";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
import { GET_ALL_PRODUCT } from "../../../redux/api/service/productService";
import InputLabel from "@mui/material/InputLabel";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import ShowProductDetail from "../../../components/modal/ShowProductDetail";
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
import { put_status_product } from "../../../redux/thunk/productThunk";

function ManageProduct() {
  const dispatch = useDispatch();
  const categories = useSelector(CATEGORY);
  const products = useSelector(PRODUCT);

  // handle add new product
  const [toggle, setToggle] = useState(false);
  const handleCreateForm = () => setToggle(true);
  const handleCloseForm = () => setToggle(false);

  // data edit
  const [edit, setEdit] = useState(null);
  // handle edit info product

  const [openEditInfo, setOpenEditInfo] = useState(false);
  const handleOpenEditInfo = (item) => {
    setEdit(item);
    setOpenEditInfo(true);
  };
  const handleCloseEditInfo = () => setOpenEditInfo(false);

  // handle edit image product
  const [openEditImage, setOpenEditImage] = useState(false);
  const handleOpenEditImage = (item) => {
    setEdit(item);
    setOpenEditImage(true);
  };
  const handleCloseEditImage = () => setOpenEditImage(false);

  // handle change status product
  const handleChangeStatusProduct = (id) => {
    dispatch(put_status_product(id));
  };

  // handle open product detail
  const [productDetail, setProductDetail] = useState(null);

  const [openProductDetail, setOpenProductDetail] = useState(false);
  const handleOpenProductDetail = (item) => {
    setProductDetail(item);
    setOpenProductDetail(true);
  };
  const handleCloseProductDetail = () => setOpenProductDetail(false);

  // handle filter by category
  const [category, setCategory] = useState("ALL");
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // handle change page
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
  };

  // handle load product
  const handleLoadProduct = (newPage) => {
    dispatch(GET_ALL_PRODUCT({ search, category, page: newPage }));
  };

  useEffect(() => {
    dispatch(GET_ALL_CATEGORY(""));
    handleLoadProduct(products.current - 1);
  }, [search, category, products.current]);

  return (
    <div>
      {console.log("current ->", products.products)}
      <div className="flex justify-center text-3xl font-semibold uppercase">
        Manage Products
      </div>
      <div className="flex justify-end">
        <div className="add_manager">
          <Button
            variant="contained"
            className="flex gap-2"
            onClick={handleCreateForm}
          >
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
                  <TableCell align="center" sx={{ width: "300px" }}>
                    ACTIONS
                  </TableCell>
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
                      <TableCell
                        align="center"
                        onClick={() => handleOpenProductDetail(item)}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => handleOpenProductDetail(item)}
                      >
                        {item.productName.toUpperCase()}
                      </TableCell>
                      <TableCell
                        align="left"
                        onClick={() => handleOpenProductDetail(item)}
                      >
                        {item.description}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenProductDetail(item)}
                      >
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
                      <TableCell
                        align="center"
                        onClick={() => handleOpenProductDetail(item)}
                      >
                        {item.category.categoryName}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleOpenProductDetail(item)}
                      >
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
                              variant="contained"
                              color="warning"
                              onClick={() => handleOpenEditInfo(item)}
                            >
                              <Tooltip title="edit info">
                                <EditIcon />
                              </Tooltip>
                            </Button>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => handleOpenEditImage(item)}
                            >
                              <Tooltip title="edit image">
                                <FilterIcon />
                              </Tooltip>
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleChangeStatusProduct(item.id)}
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
                            onClick={() => handleChangeStatusProduct(item.id)}
                          >
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
            page={products.current}
            color="primary"
            hideNextButton
            hidePrevButton
            onChange={handleChangePage}
          />
        </div>
      </div>
      {toggle && (
        <FormAddProduct
          toggle={toggle}
          handleCloseForm={handleCloseForm}
          handleLoadProduct={handleLoadProduct}
        />
      )}
      {openEditInfo && (
        <FormEditProductInfo
          openEditInfo={openEditInfo}
          handleCloseEditInfo={handleCloseEditInfo}
          editInfo={edit}
        />
      )}
      {openEditImage && (
        <FormEditImageProduct
          openEditImage={openEditImage}
          handleCloseEditImage={handleCloseEditImage}
          editImage={edit}
        />
      )}
      {openProductDetail && (
        <ShowProductDetail
          openProductDetail={openProductDetail}
          handleCloseProductDetail={handleCloseProductDetail}
          productDetail={productDetail}
        />
      )}
    </div>
  );
}

export default ManageProduct;
