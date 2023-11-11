import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./productDetail.css";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  delete_product_in_favourite,
  post_add_product_detail_to_cart,
  post_add_product_to_favourite,
} from "../../../../redux/thunk/userThunk";
import {
  getMaxPrice,
  getMinPrice,
  getProductDetailBySizeIdAndColorId,
  getTotalStock,
  showListColorBySizeId,
} from "../../../../utils/showDataProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import PropertiesProduct from "../../../../components/modal/PropertiesProduct";
import Swal from "sweetalert2";
import { USER } from "../../../../redux/selectors/selectors";
import instance from "../../../../redux/api/axios";

function ProductDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // handle show properties
  const [openProperties, setOpenProperties] = useState(false);
  const handleOpenProperties = () => setOpenProperties(true);
  const handleCloseProperties = () => setOpenProperties(false);

  const user = useSelector(USER);

  // data product
  const [data, setData] = useState(null);

  // handle load product by id
  const handleLoadProductById = async () => {
    await instance
      .get(`/api/products/${id}`)
      .then((resp) => {
        setData(resp.data);
        setSizeId(resp.data.sizes[0].id);
        setcolors(
          showListColorBySizeId(
            resp.data.productDetailResponses,
            resp.data.sizes[0].id
          )
        );
      })
      .catch((err) => console.log(err));
  };

  // handle like product
  const handleLikeProduct = (idProduct) => {
    let check = user.favourite.includes(idProduct);
    if (check) {
      dispatch(delete_product_in_favourite(idProduct));
    } else {
      dispatch(post_add_product_to_favourite(idProduct));
    }
  };

  // handle select color
  const [colorId, setColorId] = useState(null);
  const handleChangeColorId = (e) => {
    setColorId(Number.parseInt(e.target.value));
  };

  // handle select size
  const [sizeId, setSizeId] = useState(null);
  const handleChangeSizeId = (e) => {
    setSizeId(Number.parseFloat(e.target.value));
  };

  // color after select size
  const [colors, setcolors] = useState([]);

  // handle select product detail
  const [productDetail, setProductDetail] = useState(null);
  const handleFormatInfoProductDetail = () => {
    setProductDetail(
      getProductDetailBySizeIdAndColorId(
        data.productDetailResponses,
        sizeId,
        colorId
      )
    );
  };

  // start handle add product to cart
  const handleAddProductToCart = () => {
    if (productDetail) {
      dispatch(post_add_product_detail_to_cart(productDetail.id));
      Swal.fire({
        title: "Good job!",
        text: "Đã thêm vào giỏ hàng thành công!",
        icon: "success",
        showCloseButton: true,
        cancelButtonColor: "#27ae60",
        cancelButtonText: "OK",
      }).then(() => navigate("/cart"));
    } else {
      Swal.fire({
        title: "Good job!",
        text: "Vui lòng chọn đầy đủ thông tin!",
        icon: "error",
        showCloseButton: true,
        cancelButtonColor: "#27ae60",
        cancelButtonText: "OK",
      });
    }
  };
  // end handle add product to cart

  useEffect(() => {
    if (data && colorId) {
      handleFormatInfoProductDetail();
    }
  }, [colorId]);

  useEffect(() => {
    if (data) {
      console.log("trong useEffect -> ", data);
      setcolors(showListColorBySizeId(data.productDetailResponses, sizeId));
    }
    setColorId(null);
    setProductDetail(null);
  }, [sizeId]);

  useEffect(() => {
    handleLoadProductById();
  }, []);

  return (
    <div className="mx-60 py-10">
      <div className="flex gap-5 border-2 border-black p-5">
        <div style={{ width: "500px" }}>
          <Swiper
            style={{ width: "500px", height: "550px" }}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {data &&
              data.imageResponses.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <img
                      className="w-full h-full object-cover"
                      src={item.url}
                      alt=""
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="relative flex-1 bg-slate-100 p-10 rounded-lg">
          <h2 className="uppercase text-5xl font-semibold">
            {data && data.productName}
          </h2>
          <h3 className="description py-3">{data && data.description}</h3>
          <p className="py-3 text-lg">
            <b className="uppercase">Price : </b>
            <span>
              {productDetail && `${productDetail.price}$`}
              {data &&
                !productDetail &&
                !colorId &&
                `${getMinPrice(data.productDetailResponses)}$ - ${getMaxPrice(
                  data.productDetailResponses
                )}$`}
            </span>
          </p>
          <p className="py-3 text-lg">
            <b className="uppercase">Số lượng : </b>
            <span>
              {productDetail && productDetail.stock}
              {data &&
                !productDetail &&
                !colorId &&
                getTotalStock(data.productDetailResponses)}
            </span>
          </p>
          {/* select size */}
          <div className="select_size flex items-center gap-5">
            <h3 className="font-semibold text-lg uppercase w-28">Size:</h3>
            <div className="select p-2">
              <div className="radio-input-size">
                {data &&
                  data.sizes.map((item) => {
                    if (item.id === sizeId) {
                      return (
                        <>
                          <input
                            value={item.id}
                            name="size"
                            id={item.sizeName}
                            type="radio"
                            checked
                          />
                          <label htmlFor={item.sizeName}>{item.sizeName}</label>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <input
                            value={item.id}
                            name="size"
                            id={item.sizeName}
                            type="radio"
                            onClick={handleChangeSizeId}
                          />
                          <label htmlFor={item.sizeName}>{item.sizeName}</label>
                        </>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          {/* select color */}
          <div className="select_color flex items-center gap-5">
            <h3 className="font-semibold text-lg uppercase w-28">Color:</h3>
            <div className="select p-2">
              <div className="radio-input-color">
                {sizeId &&
                  colors.length > 0 &&
                  colors.map((item) => {
                    if (item.id === colorId) {
                      return (
                        <>
                          <input
                            value={item.id}
                            name="color"
                            id={item.colorName}
                            type="radio"
                            checked
                          />
                          <label htmlFor={item.colorName}>
                            {item.colorName.toUpperCase()}
                          </label>
                        </>
                      );
                    } else {
                      return (
                        <>
                          <input
                            value={item.id}
                            name="color"
                            id={item.colorName}
                            type="radio"
                            onChange={handleChangeColorId}
                          />
                          <label htmlFor={item.colorName}>
                            {item.colorName.toUpperCase()}
                          </label>
                        </>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          <div className="add_to_cart pt-10 flex gap-10">
            <button className="fancy" onClick={handleAddProductToCart}>
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
              sx={
                data && user.favourite.includes(data.id)
                  ? {
                      fontSize: "30px",
                      color: "red",
                      padding: "5px",
                      bgcolor: "#3498db",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                    }
                  : {
                      fontSize: "30px",
                      color: "#fff",
                      padding: "5px",
                      bgcolor: "#3498db",
                      borderRadius: "50%",
                      transition: "all 0.3s ease",
                    }
              }
              className="hover:cursor-pointer"
              onClick={() => handleLikeProduct(data.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
