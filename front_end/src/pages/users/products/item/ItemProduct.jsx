import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function ItemProduct() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-2xl">
        <div className="relative mx-4 -mt-6 h-96 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
          <img
            src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_3_grande.jpg?v=142"
            className="w-full object-cover hover:scale-125 hover:rotate-6 transition-all duration-500"
            alt=""
          />
          <FavoriteIcon className="absolute z-50 top-3 right-3 hover:cursor-pointer" />
        </div>
        <div className="px-6 py-3 flex justify-between items-center">
          <button
            onClick={() => navigate("/products/detail")}
            data-ripple-light="true"
            type="button"
            className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            MORE
          </button>
          <div>
            <h5 className=" text-center block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased uppercase">
              Tailwind card
            </h5>
            <h6 className="uppercase text-lg underline text-right">500$</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemProduct;
