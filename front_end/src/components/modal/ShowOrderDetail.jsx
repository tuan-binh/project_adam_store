import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import { Cookies } from "react-cookie";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import instance from "../../redux/api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflow: "hidden",
};

function ShowOrderDetail({ openOrderDetail, handleCloseOrderDetail, orderId }) {
  const [data, setData] = useState(null);

  const handleLoadOrderDetail = async () => {
    await instance
      .get(`/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${new Cookies().get("token")}`,
        },
      })
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleLoadOrderDetail();
  }, []);

  return (
    <Modal
      open={openOrderDetail}
      onClose={handleCloseOrderDetail}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="bg-slate-200">
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">NAME</TableCell>
              <TableCell align="center">COLOR</TableCell>
              <TableCell align="center">SIZE</TableCell>
              <TableCell align="center">PRICE</TableCell>
              <TableCell align="center">QUANTITY</TableCell>
              <TableCell align="center">TOTAL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item, index) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">
                      {item.productDetail.product.productName.toUpperCase()}
                    </TableCell>
                    <TableCell align="center">
                      {item.productDetail.color.colorName}
                    </TableCell>
                    <TableCell align="center">
                      {item.productDetail.size.sizeName}
                    </TableCell>
                    <TableCell align="center">
                      {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="center">
                      {(item.price * item.quantity).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
}

export default ShowOrderDetail;
