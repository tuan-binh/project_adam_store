package back_end.service;

import back_end.dto.request.ImageProductRequest;
import back_end.dto.request.ProductDetailRequest;
import back_end.dto.request.ProductRequest;
import back_end.dto.request.ProductUpdateRequest;
import back_end.dto.response.ProductResponse;
import back_end.exception.CustomException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
	
	Page<ProductResponse> findAll(Pageable pageable,String category,String search);
	
	ProductResponse findById(Long id) throws CustomException;
	
	ProductResponse save(ProductRequest productRequest) throws CustomException;
	
	ProductResponse update(ProductUpdateRequest productUpdateRequest,Long id) throws CustomException;
	
	ProductResponse changeStatusProduct(Long id) throws CustomException;
	
	ProductResponse addImageToProduct(ImageProductRequest imageProductRequest, Long id) throws CustomException;
	
	ProductResponse deleteImageInProduct(Long imageId,Long productId) throws CustomException;
	
	ProductResponse addProductDetailToProduct(ProductDetailRequest productDetailRequest,Long id) throws CustomException;
	
	ProductResponse updateProductDetailInProduct(ProductDetailRequest productDetailRequest,Long productDetailId,Long productId) throws CustomException;
	
	ProductResponse changeStatusProductDetail(Long productDetailId,Long productId) throws CustomException;
	
}
