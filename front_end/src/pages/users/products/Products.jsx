import { CATEGORY, PRODUCT, USER } from "../../../redux/selectors/selectors";
import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import {
  delete_product_in_favourite,
  post_add_product_to_favourite,
} from "../../../redux/thunk/userThunk";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Banner from "../../../components/banner/Banner";
import { Cookies } from "react-cookie";
import FormControl from "@mui/material/FormControl";
import { GET_ALL_CATEGORY } from "../../../redux/api/service/categoryService";
import { GET_ALL_PRODUCT } from "../../../redux/api/service/productService";
import InputLabel from "@mui/material/InputLabel";
import ItemProduct from "./item/ItemProduct";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Toastify from "toastify-js";
import { changeCurrentPage } from "../../../redux/reducers/productSlice";

function Products() {
  const dispatch = useDispatch();
  const categories = useSelector(CATEGORY);
  const products = useSelector(PRODUCT);

  const user = useSelector(USER);

  // handle filter by category
  const [categoryValue, setCategoryValue] = useState("ALL");
  const handleChangeCategoryValue = (event) => {
    setCategoryValue(event.target.value);
  };

  // handle search
  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  // handle change page
  const handleChangePage = (e, value) => {
    dispatch(changeCurrentPage(value));
  };

  // handle like product
  const handleLikeProduct = (idProduct) => {
    if (!new Cookies().get("token")) {
      Swal.fire({
        title: "Good job!",
        text: "Vui lòng đăng nhập!",
        icon: "error",
        showCloseButton: true,
        cancelButtonColor: "#27ae60",
        cancelButtonText: "OK",
      });
    }
    let check = user.favourite.includes(idProduct);
    if (check) {
      dispatch(delete_product_in_favourite(idProduct));
      Toastify({
        text: "Đã xóa khỏi danh sách yêu thích",
        className: "info",
        style: {
          backgroundColor: "#ff7474",
          backgroundImage: "linear-gradient(315deg, #ff7474 0%, #FF0000 99%)",
        },
        position: "center",
      }).showToast();
    } else {
      dispatch(post_add_product_to_favourite(idProduct));
      Toastify({
        text: "Đã thêm vào danh sách yêu thích",
        className: "info",
        style: {
          backgroundColor: "#0093E9",
          backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
        },
        position: "center",
      }).showToast();
    }
  };

  useEffect(() => {
    dispatch(GET_ALL_CATEGORY(""));
    dispatch(
      GET_ALL_PRODUCT({
        search,
        category: categoryValue,
        page: products.current - 1,
      })
    );
  }, [search, categoryValue, products.current]);

  return (
    <div>
      <Banner title={"PRODUCTS"} />
      <main className="mx-60 flex gap-10 py-10">
        {/* handle filter */}
        <div className="w-1/4 relative">
          <div className="px-5 py-3 flex flex-col gap-5 sticky top-10">
            <div
              className="p-5 rounded-md shadow-md"
              style={{ background: "#f1f2f6" }}
            >
              <TextField
                fullWidth
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                onChange={debouncing(handleChangeSearch, TIME_OUT)}
              />
            </div>
            <div
              className="p-5 rounded-md shadow-md"
              style={{ background: "#f1f2f6" }}
            >
              <h2 className="uppercase font-semibold text-xl">
                Filter by category
              </h2>
              <div className="filter py-3">
                <FormControl fullWidth size="small">
                  <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryValue}
                    label="Age"
                    onChange={handleChangeCategoryValue}
                  >
                    <MenuItem value={"ALL"}>ALL</MenuItem>
                    {categories.status !== "pending" &&
                      categories.categories.map((item) => {
                        if (item.status) {
                          return (
                            <MenuItem key={item.id} value={item.categoryName}>
                              {item.categoryName}
                            </MenuItem>
                          );
                        }
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        {/* handle show products */}
        <div className="flex-1 pt-20 px-3">
          <div className=" flex gap-x-5 gap-y-20 flex-wrap">
            {products.products.length > 0 ? (
              products.products.map((item) => {
                if (item.status === true) {
                  return (
                    <ItemProduct
                      key={item.id}
                      item={item}
                      handleLikeProduct={handleLikeProduct}
                    />
                  );
                }
              })
            ) : (
              <div className="text-3xl flex justify-center w-full items-center h-40">
                <p>&quot;{search}&quot; not found</p>
              </div>
            )}
          </div>
          <div className="pagination py-10 flex justify-end">
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
      </main>
    </div>
  );
}

export default Products;
