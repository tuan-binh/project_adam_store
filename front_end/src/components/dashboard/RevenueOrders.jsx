import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import instance from "../../redux/api/axios";

function RevenueOrders() {
  // handle change year
  const [yearValue, setYearValue] = useState(new Date().getFullYear());
  const handleChangeYearValue = (e) => {
    setYearValue(e.$y);
  };

  const [data, setData] = useState(null);

  const handleLoadOrders = async () => {
    await instance
      .get(`/api/dashboard/revenue/order/?year=${yearValue}`)
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleLoadOrders();
  }, [yearValue]);

  return (
    <div className="bg-white pb-20 rounded-lg shadow-xl" style={{ height: "650px" }}>
      <div className="flex justify-between items-center px-7">
        <h1 className="text-center p-5 text-2xl uppercase">báo cáo orders hàng tháng theo năm</h1>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker label={yearValue} views={["year"]} onChange={handleChangeYearValue} />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="success" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueOrders;
