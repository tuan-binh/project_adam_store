import {
  delete_product_in_favourite,
  post_add_product_to_favourite,
} from "../../../../redux/thunk/userThunk";
import { getMaxPrice, getMinPrice } from "../../../../utils/showDataProduct";
import { useDispatch, useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { USER } from "../../../../redux/selectors/selectors";
import { useNavigate } from "react-router-dom";

function ItemProduct({ item }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(USER);

  // handle like product
  const handleLikeProduct = (idProduct) => {
    let check = user.favourite.includes(idProduct);
    if (check) {
      dispatch(delete_product_in_favourite(idProduct));
    } else {
      dispatch(post_add_product_to_favourite(idProduct));
    }
  };

  return (
    <div>
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
        <div className="relative mx-4 -mt-6 h-96 overflow-hidden rounded-2xl border-2 border-black border-dashed bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img
            src={item.image}
            className="w-full h-full object-cover hover:scale-125 hover:rotate-6 transition-all duration-500"
            alt=""
          />
          <FavoriteIcon
            className="absolute z-50 top-3 right-3 hover:cursor-pointer"
            sx={
              user.favourite.includes(item.id)
                ? {
                    fontSize: "25px",
                    color: "red",
                    padding: "5px",
                    bgcolor: "#3498db",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                  }
                : {
                    fontSize: "25px",
                    color: "#fff",
                    padding: "5px",
                    bgcolor: "#3498db",
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                  }
            }
            onClick={() => handleLikeProduct(item.id)}
          />
        </div>
        <div className="px-6 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate(`/products/detail/${item.id}`)}
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            MORE
          </button>
          <div>
            <h5 className=" text-center block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased uppercase">
              {item.productName}
            </h5>
            <h6 className="uppercase text-lg text-right">
              <span className="underline">
                {getMinPrice(item.productDetailResponses)} $
              </span>{" "}
              -{" "}
              <span className="underline">
                {getMaxPrice(item.productDetailResponses)} $
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
