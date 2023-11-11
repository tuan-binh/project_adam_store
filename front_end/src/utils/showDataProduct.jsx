export const getMinPrice = (listProductDetail) => {
  let minPrice = 0;
  listProductDetail.forEach((item) => {
    if (item.status) {
      if (minPrice > item.price) {
        minPrice = item.price;
      }
    }
  });
  return minPrice;
};

export const getMaxPrice = (listProductDetail) => {
  let maxPrice = 0;
  listProductDetail.forEach((item) => {
    if (item.status) {
      if (maxPrice < item.price) {
        maxPrice = item.price;
      }
    }
  });
  return maxPrice;
};

export const getTotalStock = (listProductDetail) => {
  return listProductDetail.reduce((sum, item) => (sum += item.stock), 0);
};

export const showListColorBySizeId = (listProductDetail, sizeId) => {
  let tempArr = [];
  console.log("listProductDetail -> ", listProductDetail);
  listProductDetail.forEach((item) => {
    if (item.size.id === sizeId) {
      tempArr.push(item.color);
    }
  });
  console.log("listColor ->", tempArr);
  return tempArr;
};

export const getProductDetailBySizeIdAndColorId = (
  listProductDetail,
  sizeId,
  colorId
) => {
  let result = {};
  listProductDetail.forEach((item) => {
    if (item.color.id === colorId && item.size.id === sizeId) {
      result = item;
    }
  });
  return result;
};
