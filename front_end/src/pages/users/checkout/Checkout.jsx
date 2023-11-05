import "./checkout.css";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TextField from "@mui/material/TextField";
import TurnRightIcon from "@mui/icons-material/TurnRight";

function Checkout() {
  return (
    <div className="mx-60 py-20">
      <div className="flex gap-10">
        <div className="w-3/5 bg-slate-100 px-10 py-5 shadow-2xl rounded-lg">
          <div className="flex justify-between items-center py-2 border-b-2 border-black border-dashed">
            <h2 className="uppercase text-2xl">Address</h2>
            <div className="actions">
              <div className="radio-input-wrapper">
                <label className="label">
                  <input
                    value="value-2"
                    name="value-radio"
                    id="value-2"
                    className="radio-input"
                    type="radio"
                    checked
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Your Address</div>
                </label>
                <label className="label">
                  <input
                    value="value-3"
                    name="value-radio"
                    id="value-3"
                    className="radio-input"
                    type="radio"
                  />
                  <div className="radio-design"></div>
                  <div className="label-text">Different Address</div>
                </label>
              </div>
            </div>
          </div>
          <div className="body pt-20 flex flex-col gap-5">
            <TextField
              id="outlined-basic"
              label="Customer"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              type="number"
              fullWidth
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-5 ">
          <div
            className="bg-slate-100 px-10 py-5 shadow-2xl rounded-lg"
            style={{ minHeight: "300px" }}
          >
            <h2 className="uppercase text-2xl py-2 border-b-2 border-black border-dashed">
              <b>Coupon</b>
            </h2>
            <div className="body py-3">
              <TextField
                id="filled-basic"
                fullWidth
                size="small"
                label="Search"
                variant="outlined"
              />
            </div>
            <div className="body bg-white h-28 mt-4 rounded-lg px-5 py-3 shadow-xl">
              <div className="head flex justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LocalActivityIcon sx={{ color: "red" }} />
                  <span>NOEL 2023</span>
                </h3>
                <h3>
                  <b className="uppercase">stock :</b> <span>10</span>
                </h3>
              </div>
              <div className="body">
                <p>
                  <b className="uppercase">Persent :</b> <span>10%</span>
                </p>
              </div>
              <div className="flex justify-between items-end">
                <p>
                  <b className="uppercase">Date : </b>
                  <span>12/10/2023</span>
                  <span> - </span>
                  <span>18/11/2023</span>
                </p>
                <DeleteIcon className="hover:cursor-pointer text-2xl text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-slate-100 px-10 py-5 shadow-2xl rounded-lg">
            <h2 className="uppercase text-2xl py-2 border-b-2 border-black border-dashed">
              <b>Detail</b>
            </h2>
            <div className="body py-3">
              {/* products */}
              <div className="products border-b-2 pb-5 border-black border-dashed">
                <h3>
                  <b className="uppercase">Products :</b>
                </h3>
                <div className="list">
                  <p className="flex justify-between">
                    <span>
                      <TurnRightIcon /> Product name 1
                    </span>
                    <span>150$</span>
                  </p>
                  <p className="flex justify-between">
                    <span>
                      <TurnRightIcon /> Product name 2
                    </span>
                    <span>200$</span>
                  </p>
                  <p className="flex justify-between">
                    <span>
                      <TurnRightIcon /> Product name 3
                    </span>
                    <span>250$</span>
                  </p>
                </div>
              </div>
              {/* totals */}
              <div className="total_before  border-b-2 py-5 border-black border-dashed">
                <p className="flex justify-between">
                  <span>
                    <b>SubTotal </b>
                  </span>
                  <span>600$</span>
                </p>
                <p className="flex justify-between">
                  <span>
                    <b>Discount </b>
                  </span>
                  <span>10%</span>
                </p>
              </div>
              <div className="total_after">
                <p className="flex justify-between items-center py-5">
                  <span className="uppercase font-semibold text-2xl">
                    Total
                  </span>
                  <span>550$</span>
                </p>
              </div>
              {/* check out */}
              <div>
                <Button variant="contained" fullWidth>
                  Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
