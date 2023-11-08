package back_end.controller;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.exception.CustomException;
import back_end.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private ICategoryService categoryService;
	
	
	// chức năng lấy tất cả các thông tin của thể loại sản phẩm có trong hệ thống
	@GetMapping
	public ResponseEntity<List<CategoryResponse>> getAllCategories(@RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(categoryService.findAll(search), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin thể loai sản phẩm theo id
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.findById(categoryId), HttpStatus.OK);
	}
	
	// chức năng thêm thể loại sản phẩm mới
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<CategoryResponse> addNewCategory(@RequestBody CategoryRequest categoryRequest) throws CustomException {
		return new ResponseEntity<>(categoryService.save(categoryRequest), HttpStatus.CREATED);
	}
	
	// chức năng update thể loại sản phẩm theo id
	@PutMapping("/{categoryId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<CategoryResponse> updateCategory(@RequestBody CategoryRequest categoryRequest, @PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.update(categoryRequest,categoryId),HttpStatus.OK);
	}
	
	// chức năng thay đổi trạng thái của thể loại sản phẩm ( true or false )
	// nếu nó là true thì sẽ là shop còn bán những sản phẩm thuộc thể loại đó
	// nếu nó là false thì sẽ không cho tạo sản phẩm thuộc thể loại đó nữa
	@PutMapping("/{categoryId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<CategoryResponse> changeStatusCategory(@PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.changeStatusCategory(categoryId), HttpStatus.OK);
	}
	
}
