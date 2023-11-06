import Banner from "../../../components/banner/Banner";
import ItemCoupon from "../../../components/item_coupon/ItemCoupon";
import TextField from "@mui/material/TextField";

function Coupon() {
  return (
    <div>
      <Banner title={"COUPON"} />
      <div className="body_coupon mx-60 py-20">
        <div className="search flex">
          <div className="w-3/4 mx-auto">
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="body flex gap-4 justify-around flex-wrap pt-10">
          <ItemCoupon />
          <ItemCoupon />
          <ItemCoupon />
          <ItemCoupon />
        </div>
      </div>
    </div>
  );
}

export default Coupon;
