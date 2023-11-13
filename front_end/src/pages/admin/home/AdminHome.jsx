import Calender from "../../../components/dashboard/Calender";
import Result from "../../../components/dashboard/Result";

function AdminHome() {
  return (
    <div className="flex">
      <div className="p-7 flex flex-col gap-7" style={{ width: "75%" }}>
        <Result />
      </div>
      <div className="p-7 flex-1">
        <Calender />
      </div>
    </div>
  );
}

export default AdminHome;
