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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {
	
	@Autowired
	private IProductService productService;
	
	// chức năng lấy tất cả thông tin sản phẩm theo thể loại tìm kiếm và phân trang ở trong hệ thống
	@GetMapping
	public ResponseEntity<Page<ProductResponse>> getAllProducts(@PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.ASC) Pageable pageable,@RequestParam String category,@RequestParam String search) {
		return new ResponseEntity<>(productService.findAll(pageable,category,search), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin sản phẩm theo id
	@GetMapping("/{productId}")
	public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.findById(productId), HttpStatus.OK);
	}
	
	// chức năng thêm thông tin sản phẩm vào trong hệ thống
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> addNewProduct(@RequestBody ProductRequest productRequest) throws CustomException {
		return new ResponseEntity<>(productService.save(productRequest), HttpStatus.CREATED);
	}
	
	// chức năng update thông tin sản phẩm theo id
	@PutMapping("/{productId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> updateProduct(@RequestBody ProductUpdateRequest productUpdateRequest, @PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.update(productUpdateRequest, productId), HttpStatus.OK);
	}
	
	// chức năng thay đổi trạng thái của sản phẩm ( true or false )
	// nếu nó là true thì hiển thị sản phẩm ở phía người dùng ( sản phẩm được tiếp tục bán trong shop )
	// nếu nó là false thì sẽ ẩn đi ở phía người dùng ( sản phẩm đã ko được bán ở trong shop )
	@PutMapping("/{productId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> changeStatusProduct(@PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.changeStatusProduct(productId), HttpStatus.OK);
	}
	
	// =========== chức năng liên quan đến ảnh của product ===========
	
	// chức năng thêm danh sách ảnh vào sản phẩm theo id sản phẩm
	@PutMapping("/{productId}/image")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> addImageToProduct(@RequestBody ImageProductRequest imageProductRequest, @PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.addImageToProduct(imageProductRequest, productId), HttpStatus.OK);
	}
	
	// chức năng xóa ảnh của sản phẩm dựa vào id ảnh và id sản phẩm
	@DeleteMapping("/{imageId}/in/{productId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> deleteImageInProduct(@PathVariable Long imageId, @PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.deleteImageInProduct(imageId, productId), HttpStatus.OK);
	}
	
	// =========== chức năng liên quan đến product detail ===========
	
	// chức năng liên quan đến thêm thông tin đến sản phẩm chi tiết dựa theo id của sản phẩm
	@PostMapping("/{productId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> addProductDetailToProduct(@RequestBody ProductDetailRequest productDetailRequest, @PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.addProductDetailToProduct(productDetailRequest, productId), HttpStatus.CREATED);
	}
	
	// chức năng update thông tin sản phẩm chi tiết dựa theo id chi tiết và id product
	@PutMapping("/{productDetailId}/in/{productId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ProductResponse> updateProductDetailInProduct(@RequestBody ProductDetailRequest productDetailRequest, @PathVariable Long productDetailId, @PathVariable Long productId) throws CustomException {
		return new ResponseEntity<>(productService.updateProductDetailInProduct(productDetailRequest, productDetailId, productId), HttpStatus.OK);
	}
	
//	// chức năng thay
//	@PutMapping("/{productDetailId}/in/{productId}/status")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
//	public ResponseEntity<ProductResponse> changeStatusProductDetail(@PathVariable Long productDetailId, @PathVariable long productId) throws CustomException {
//		return new ResponseEntity<>(productService.changeStatusProductDetail(productDetailId, productId), HttpStatus.OK);
//	}
	
}
