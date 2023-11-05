import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  return (
    <div className="mx-60 py-20">
      <div className="flex gap-10">
        <div className="flex-1">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-slate-200">
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">IMAGE</TableCell>
                <TableCell align="center">PRICE</TableCell>
                <TableCell align="center">QUANTITY</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </div>
        <div className="relative w-1/4">
          <div className="sticky top-10 bg-slate-200 px-10 pt-10 pb-5 rounded-lg shadow-lg">
            <h1 className="text-center uppercase font-semibold text-xl">
              Your Bill
            </h1>
            <div className="py-5 border-b-2 border-black border-dashed">
              <h2>
                <b style={{ minWidth: "100px", display: "inline-block" }}>
                  Quantity :
                </b>{" "}
                <span>10</span>
              </h2>
              <h2>
                <b style={{ minWidth: "100px", display: "inline-block" }}>
                  Total :
                </b>{" "}
                <span>2000$</span>
              </h2>
            </div>
            <div className="actions py-5">
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
