import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

function UserOrders() {
  const [filter, setFilter] = useState("ALL");

  const handleFilterOrder = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="orders mx-60 py-20">
      <div className="head">
        <h1 className="text-center uppercase text-3xl pb-5">Your Order</h1>
      </div>
      <div className="body">
        <div className="filter w-full flex justify-end">
          <div className="w-52 py-5">
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Age"
                onChange={handleFilterOrder}
              >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="table w-full">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className="bg-slate-200">
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">LOCATION</TableCell>
                <TableCell align="center">PHONE</TableCell>
                <TableCell align="center">TOTAL</TableCell>
                <TableCell align="center">COUPON</TableCell>
                <TableCell align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default UserOrders;
