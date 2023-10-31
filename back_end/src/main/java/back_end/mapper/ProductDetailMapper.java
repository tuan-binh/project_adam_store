package back_end.mapper;

import back_end.dto.request.ProductDetailRequest;
import back_end.dto.response.ProductDetailResponse;
import back_end.exception.CustomException;
import back_end.model.ProductDetail;
import back_end.repository.IColorRepository;
import back_end.repository.IProductRepository;
import back_end.repository.ISizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductDetailMapper implements IGenericMapper<ProductDetail, ProductDetailRequest, ProductDetailResponse> {
	
	@Autowired
	private IColorRepository colorRepository;
	@Autowired
	private ISizeRepository sizeRepository;
	
	@Override
	public ProductDetail toEntity(ProductDetailRequest productDetailRequest) throws CustomException {
		return ProductDetail.builder()
				  .price(productDetailRequest.getPrice())
				  .stock(productDetailRequest.getStock())
				  .color(colorRepository.findById(productDetailRequest.getColorId()).orElseThrow(() -> new CustomException("color not found")))
				  .size(sizeRepository.findById(productDetailRequest.getSizeId()).orElseThrow(() -> new CustomException("size not found")))
				  .status(productDetailRequest.isStatus())
				  .build();
	}
	
	@Override
	public ProductDetailResponse toResponse(ProductDetail productDetail) {
		return ProductDetailResponse.builder()
				  .id(productDetail.getId())
				  .price(productDetail.getPrice())
				  .stock(productDetail.getStock())
				  .color(productDetail.getColor())
				  .size(productDetail.getSize())
				  .status(productDetail.isStatus())
				  .build();
	}
}
