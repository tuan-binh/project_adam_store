import TextField from "@mui/material/TextField";

function Checkout() {
  return (
    <div className="mx-60 py-20">
      <div className="flex gap-10">
        <div className="flex-1 bg-slate-100 px-10 py-5">address</div>
        <div className="flex-1 bg-slate-100 px-10 py-5">
          <h1 className="text-center uppercase text-xl py-3">Coupon</h1>
          <TextField
            id="filled-basic"
            fullWidth
            size="small"
            label="Search"
            variant="outlined"
          />
        </div>
        <div className="flex-1 bg-slate-100 px-10 py-5">detail</div>
      </div>
    </div>
  );
}

export default Checkout;
