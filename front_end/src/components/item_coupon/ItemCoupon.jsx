import Chip from "@mui/material/Chip";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";

function ItemCoupon() {
  return (
    <div
      className="body bg-slate-100 h-28 mt-4 rounded-lg px-5 py-3 shadow-xl"
      style={{ width: "24%" }}
    >
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
      <div className="flex justify-between items-center">
        <p>
          <span>12/10/2023</span>
          <span> - </span>
          <span>18/11/2023</span>
        </p>
        <p>
          <Chip label="IN STOCK" color="success" />
        </p>
      </div>
    </div>
  );
}

export default ItemCoupon;
