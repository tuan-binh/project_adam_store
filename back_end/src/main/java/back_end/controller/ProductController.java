package back_end.controller;

import back_end.dto.request.ImageProductRequest;
import back_end.dto.request.ProductDetailRequest;
import back_end.dto.request.ProductRequest;
import back_end.dto.request.ProductUpdateRequest;
import back_end.dto.response.ProductResponse;
import back_end.exception.CustomException;
import back_end.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {

	@Autowired
	private IProductService productService;
	
	@GetMapping
	public ResponseEntity<Page<ProductResponse>> getAllProducts(@PageableDefault(page = 0,size = 6,sort = "id",direction = Sort.Direction.ASC)Pageable pageable) {
		return new ResponseEntity<>(productService.findAll(pageable), HttpStatus.OK);
	}
	
	@GetMapping("/{productId}")
	public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.findById(productId),HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<ProductResponse> addNewProduct(@RequestBody ProductRequest productRequest) throws CustomException {
		return new ResponseEntity<>(productService.save(productRequest),HttpStatus.CREATED);
	}
	
	@PutMapping("/{productId}")
	public ResponseEntity<ProductResponse> updateProduct(@RequestBody ProductUpdateRequest productUpdateRequest,@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.update(productUpdateRequest,productId),HttpStatus.OK);
	}
	
	@PutMapping("/{productId}/status")
	public ResponseEntity<ProductResponse> changeStatusProduct(@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.changeStatusProduct(productId),HttpStatus.OK);
	}
	
	// chức năng liên quan đến ảnh của product
	@PutMapping("/{productId}/image")
	public ResponseEntity<ProductResponse> addImageToProduct(@RequestBody ImageProductRequest imageProductRequest,@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.addImageToProduct(imageProductRequest,productId),HttpStatus.OK);
	}
	
	@DeleteMapping("/{imageId}/in/{productId}")
	public ResponseEntity<ProductResponse> deleteImageInProduct(@PathVariable Long imageId,@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.deleteImageInProduct(imageId,productId),HttpStatus.OK);
	}
	
	// chức năng liên quan đến product detail
	@PostMapping("/{productId}")
	public ResponseEntity<ProductResponse> addProductDetailToProduct(@RequestBody ProductDetailRequest productDetailRequest,@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.addProductDetailToProduct(productDetailRequest,productId),HttpStatus.CREATED);
	}
	
	@PutMapping("/{productDetailId}/in/{productId}")
	public ResponseEntity<ProductResponse> updateProductDetailInProduct(@RequestBody ProductDetailRequest productDetailRequest,@PathVariable Long productDetailId,@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.updateProductDetailInProduct(productDetailRequest,productDetailId,productId),HttpStatus.OK);
	}
	
	@PutMapping("/{productDetailId}/in/{productId}/status")
	public ResponseEntity<ProductResponse> changeStatsuProductDetail(@PathVariable Long productDetailId,@PathVariable long productId) throws CustomException {
		return new ResponseEntity<>(productService.changeStatusProductDetail(productDetailId,productId),HttpStatus.OK);
	}

}
