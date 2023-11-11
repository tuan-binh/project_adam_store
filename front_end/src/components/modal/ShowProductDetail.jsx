import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import FormAddProductDetail from "../form/product/FormAddProductDetail";
import FormEditProductDetail from "../form/product/FormEditProductDetail";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import { put_status_product_detail } from "../../redux/thunk/productThunk";
import { useDispatch } from "react-redux";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  // p: 2,
  overflow: "hidden",
};

function ShowProductDetail({
  openProductDetail,
  handleCloseProductDetail,
  productDetail,
}) {
  const dispatch = useDispatch();

  const [listProductDetail, setListProductDetail] = useState(
    productDetail.productDetailResponses
  );
  // handle open add product detail to product
  const [toggleAdd, setToggleAdd] = useState(false);
  const handleOpenAddProductDetail = () => setToggleAdd(true);
  const handleCloseAddProductDetail = () => setToggleAdd(false);

  // handle open edit product detail in product
  const [edit, setEdit] = useState(null);
  const [toggleEdit, setToggleEdit] = useState(false);
  const handleOpenEditProductDetail = (item) => {
    setEdit(item);
    setToggleEdit(true);
  };
  const handleCloseEditProductDetail = () => setToggleEdit(false);

  // handle change status product detail
  const handleChangeStatusProductDetail = (idProductDetail) => {
    dispatch(
      put_status_product_detail({
        idProductDetail,
        idProduct: productDetail.id,
      })
    ).then((resp) => setListProductDetail(resp.productDetailResponses));
  };

  return (
    <>
      <Modal
        open={openProductDetail}
        onClose={handleCloseProductDetail}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">STOCK</TableCell>
                <TableCell align="center">SIZE</TableCell>
                <TableCell align="center">COLOR</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center" sx={{ width: "180px" }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProductDetail.map((item, index) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">{item.stock}</TableCell>
                    <TableCell align="center">{item.size.sizeName}</TableCell>
                    <TableCell align="center">{item.color.colorName}</TableCell>
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
                            variant="contained"
                            color="warning"
                            onClick={() => handleOpenEditProductDetail(item)}
                          >
                            <Tooltip title="edit">
                              <EditIcon />
                            </Tooltip>
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleChangeStatusProductDetail(item.id)
                            }
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
                          onClick={() =>
                            handleChangeStatusProductDetail(item.id)
                          }
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
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={handleOpenAddProductDetail}
                  colSpan={8}
                  align="center"
                  className="hover:cursor-pointer hover:bg-slate-200 transition-all duration-300"
                >
                  <AddCircleOutlineIcon />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Modal>
      {toggleAdd && (
        <FormAddProductDetail
          toggleAdd={toggleAdd}
          handleCloseAddProductDetail={handleCloseAddProductDetail}
          productId={productDetail.id}
          setListProductDetail={setListProductDetail}
        />
      )}
      {toggleEdit && (
        <FormEditProductDetail
          toggleEdit={toggleEdit}
          handleCloseEditProductDetail={handleCloseEditProductDetail}
          edit={edit}
          productId={productDetail.id}
          setListProductDetail={setListProductDetail}
        />
      )}
    </>
  );
}

export default ShowProductDetail;
