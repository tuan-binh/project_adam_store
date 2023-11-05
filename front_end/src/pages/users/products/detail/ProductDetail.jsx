import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./productDetail.css";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PropertiesProduct from "../../../../components/modal/PropertiesProduct";
import UserReviews from "../../../../components/user_reviews/UserReviews";
import { useState } from "react";

function ProductDetail() {
  const [openProperties, setOpenProperties] = useState(false);
  const handleOpenProperties = () => setOpenProperties(true);
  const handleCloseProperties = () => setOpenProperties(false);

  return (
    <div className="mx-60 py-10">
      <div className="flex gap-5 border-2 border-black p-5">
        <div style={{ width: "500px" }}>
          <Swiper
            style={{ width: "500px", height: "650px" }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="w-full"
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_3_grande.jpg?v=142"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full"
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_3_grande.jpg?v=142"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="w-full"
                src="https://theme.hstatic.net/1000333436/1001040510/14/hnc1_img_3_grande.jpg?v=142"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="relative flex-1 bg-slate-100 p-10 rounded-lg">
          <h2 className="uppercase text-5xl font-semibold">
            Áo vest phương tây
          </h2>
          <h3 className="description py-3">Đây là mô tả sản phẩm áo vest</h3>
          <p className="py-3 text-lg">
            <b className="uppercase">Price : </b>
            <span>500$ - 1000$</span>
          </p>
          <p className="py-3 text-lg">
            <b className="uppercase">Số lượng : </b>
            <span>100</span>
          </p>
          {/* select size */}
          <div className="select_size flex items-center gap-5">
            <h3 className="font-semibold text-lg uppercase w-28">Size:</h3>
            <div className="select p-2">
              <div className="radio-input-size">
                <input value="S" name="size" id="S" type="radio" />
                <label htmlFor="S">S</label>
                <input value="M" name="size" id="M" type="radio" />
                <label htmlFor="M">M</label>
                <input value="X" name="size" id="X" type="radio" />
                <label htmlFor="X">X</label>
              </div>
            </div>
          </div>
          {/* select color */}
          <div className="select_color flex items-center gap-5">
            <h3 className="font-semibold text-lg uppercase w-28">Color:</h3>
            <div className="select p-2">
              <div className="radio-input-color">
                <input value="black" name="color" id="black" type="radio" />
                <label htmlFor="black">black</label>
                <input value="white" name="color" id="white" type="radio" />
                <label htmlFor="white">white</label>
                <input value="red" name="color" id="red" type="radio" />
                <label htmlFor="red">red</label>
              </div>
            </div>
          </div>
          <div className="add_to_cart pt-10 flex gap-10">
            <button className="fancy">
              <span className="top-key"></span>
              <span className="text">add to cart</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
            <button className="fancy" onClick={handleOpenProperties}>
              <span className="top-key"></span>
              <span className="text">Properties</span>
              <span className="bottom-key-1"></span>
              <span className="bottom-key-2"></span>
            </button>
            {openProperties && (
              <PropertiesProduct
                openProperties={openProperties}
                handleCloseProperties={handleCloseProperties}
              />
            )}
          </div>
          <div className="absolute top-5 right-5">
            <FavoriteIcon
              sx={{ fontSize: "30px" }}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
      <UserReviews />
    </div>
  );
}

export default ProductDetail;
