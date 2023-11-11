import { TIME_OUT, debouncing } from "../../../utils/deboucing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Banner from "../../../components/banner/Banner";
import { COUPON } from "../../../redux/selectors/selectors";
import { GET_ALL_COUPON } from "../../../redux/api/service/couponService";
import ItemCoupon from "../../../components/item_coupon/ItemCoupon";
import TextField from "@mui/material/TextField";

function Coupon() {
  const dispatch = useDispatch();

  const coupons = useSelector(COUPON);

  const [search, setSearch] = useState("");
  const handleChangeSearch = (e) => setSearch(e.target.value);

  useEffect(() => {
    dispatch(GET_ALL_COUPON(search));
  }, [search]);

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
              onChange={debouncing(handleChangeSearch, TIME_OUT)}
            />
          </div>
        </div>
        <div className="body flex gap-4 flex-wrap pt-10">
          {coupons.coupons.length > 0 ? (
            coupons.coupons.map((item) => {
              return <ItemCoupon key={item.id} item={item} />;
            })
          ) : (
            <div className="flex justify-center w-full text-3xl items-center h-40">
              <p>&quot;{search}&quot; not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Coupon;
