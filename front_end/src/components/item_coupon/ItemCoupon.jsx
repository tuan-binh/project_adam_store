import Chip from "@mui/material/Chip";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function ItemCoupon({ item }) {
  return (
    <div
      className="body bg-slate-100 h-28 mt-4 rounded-lg px-5 py-3 shadow-xl"
      style={{ width: "24%" }}
    >
      <div className="head flex justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <LocalActivityIcon sx={{ color: "red" }} />
          <span>{item.coupon}</span>
        </h3>
        <h3>
          <b className="uppercase">stock :</b> <span>{item.stock}</span>
        </h3>
      </div>
      <div className="body">
        <p>
          <b className="uppercase">Persent :</b> <span>{item.percent} %</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p>
          <span>{item.startDate}</span>
          <span> - </span>
          <span>{item.endDate}</span>
        </p>
        <p>
          <Chip label="IN STOCK" color="success" />
        </p>
      </div>
    </div>
  );
}

export default ItemCoupon;
