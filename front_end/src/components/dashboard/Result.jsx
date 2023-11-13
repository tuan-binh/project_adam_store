import DescriptionIcon from "@mui/icons-material/Description";
import Groups3Icon from "@mui/icons-material/Groups3";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { USERS_ADMIN } from "../../redux/selectors/selectors";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useSelector } from "react-redux";

function Result() {
  const users = useSelector(USERS_ADMIN);

  return (
    <div className="flex justify-between gap-5">
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg">
        <MonetizationOnIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Revenue</p>
          <p className="text-lg">120000</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg">
        <DescriptionIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Orders</p>
          <p className="text-lg">12</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg">
        <WidgetsIcon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Products</p>
          <p className="text-lg">10000</p>
        </div>
      </div>
      <div className="flex-1 bg-white h-32 flex gap-5 items-center justify-start pl-5 rounded-lg shadow-lg">
        <Groups3Icon sx={{ fontSize: "70px" }} />
        <div>
          <p className="uppercase font-semibold text-xl">Users</p>
          <p className="text-lg">10</p>
        </div>
      </div>
    </div>
  );
}

export default Result;
