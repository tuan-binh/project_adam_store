import { useEffect, useState } from "react";

import instance from "../../redux/api/axios";

function RevenueProduct() {
  const [data, setData] = useState(null);

  const handleLoadProduct = async () => {
    await instance
      .get(`/api/dashboard/revenue/product`)
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleLoadProduct();
  }, []);

  return (
    <div className="bg-white p-5 rounded-lg shadow-xl">
      <h2 className="uppercase text-xl">Top 5 Product Best Seller</h2>
      <div className="body flex flex-col gap-3 pt-3">
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between px-2 py-3 border-2 border-black rounded-md"
              >
                <p>
                  <b>{item.top.toUpperCase()}</b>
                </p>
                <p>{item.product.productName.toUpperCase()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default RevenueProduct;
