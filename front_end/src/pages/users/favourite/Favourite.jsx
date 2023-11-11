import { Cookies } from "react-cookie";
import ItemProduct from "../products/item/ItemProduct";
import { delete_product_in_favourite } from "../../../redux/thunk/userThunk";
import instance from "../../../redux/api/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";

function Favourite() {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

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
  };

  useEffect(() => {
    handleLoadFavourite();
  }, []);

  return (
    <div className="mx-60 py-10">
      <h2 className="py-20 text-center text-5xl">Your Favourites</h2>
      <div
        className="favourite_products flex justify-center flex-wrap gap-x-5 gap-y-20"
        style={{ minHeight: "364px" }}
      >
        {data &&
          data.map((item) => {
            return (
              <ItemProduct
                key={item.id}
                item={item}
                handleLikeProduct={handleLikeProduct}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Favourite;
