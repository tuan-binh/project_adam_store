import { Cookies } from "react-cookie";
import ItemProduct from "../products/item/ItemProduct";
import Toastify from "toastify-js";
import { delete_product_in_favourite } from "../../../redux/thunk/userThunk";
import instance from "../../../redux/api/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function Favourite() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleLoadFavourite = async () => {
    await instance
      .get(`/api/user/favourite`, {
        headers: {
          Authorization: `Bearer ${new Cookies().get("token")}`,
        },
      })
      .then((resp) => setData(resp.data))
      .catch((err) => console.log(err));
  };

  // handle like product
  const handleLikeProduct = (idProduct) => {
    dispatch(delete_product_in_favourite(idProduct)).then(() =>
      handleLoadFavourite()
    );
    Toastify({
      text: "Đã xóa khỏi danh sách yêu thích",
      className: "info",
      style: {
        backgroundColor: "#ff7474",
        backgroundImage: "linear-gradient(315deg, #ff7474 0%, #FF0000 99%)",
      },
      position: "center",
    }).showToast();
  };

  useEffect(() => {
    handleLoadFavourite();
  }, []);

  return (
    <div className="mx-60 py-10" style={{ minHeight: "666px" }}>
      <h2 className="py-20 text-center text-5xl">Your Favourites</h2>
      <div
        className="favourite_products flex justify-center flex-wrap gap-x-5 gap-y-20"
        style={{ minHeight: "364px" }}
      >
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <ItemProduct
                key={item.id}
                item={item}
                handleLikeProduct={handleLikeProduct}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center text-3xl text-slate-300 font-semibold">
            Your favourite is empty
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourite;
