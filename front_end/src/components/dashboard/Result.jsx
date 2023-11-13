import { useEffect, useState } from "react";

import DescriptionIcon from "@mui/icons-material/Description";
import { GET_RESULT_DASHBOARD } from "../../redux/api/service/dashboardService";
import Groups3Icon from "@mui/icons-material/Groups3";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WidgetsIcon from "@mui/icons-material/Widgets";

function Result() {
  const [data, setData] = useState(null);

  // handle load result
  const handleLoadResult = async () => {
    await GET_RESULT_DASHBOARD()
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleLoadResult();
  }, []);

  return (
    <div className="flex justify-between gap-5">
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg hover:-translate-y-2 transition-all duration-300">
        <MonetizationOnIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Revenue</p>
          <p className="text-lg">{data && data.revenue.toLocaleString()} $</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg hover:-translate-y-2 transition-all duration-300">
        <DescriptionIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Orders</p>
          <p className="text-lg">{data && data.orders.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg hover:-translate-y-2 transition-all duration-300">
        <WidgetsIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Products</p>
          <p className="text-lg">{data && data.products.toLocaleString()}</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg hover:-translate-y-2 transition-all duration-300">
        <Groups3Icon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Users</p>
          <p className="text-lg">{data && data.users.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
