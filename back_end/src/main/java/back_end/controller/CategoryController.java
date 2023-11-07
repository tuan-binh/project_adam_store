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

@RestController
@RequestMapping("/api/categories")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryResponse>> getAllCategories(@RequestParam(defaultValue = "") Optional<String> search) {
		return new ResponseEntity<>(categoryService.findAll(search), HttpStatus.OK);
	}
	
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.findById(categoryId), HttpStatus.OK);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<CategoryResponse> addNewCategory(@RequestBody CategoryRequest categoryRequest) throws CustomException {
		return new ResponseEntity<>(categoryService.save(categoryRequest), HttpStatus.CREATED);
	}
	
	@PutMapping("/{categoryId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<CategoryResponse> updateCategory(@RequestBody CategoryRequest categoryRequest, @PathVariable Long categoryId) {
		return new ResponseEntity<>(categoryService.update(categoryRequest,categoryId),HttpStatus.OK);
	}
	
	@PutMapping("/{categoryId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<CategoryResponse> changeStatusCategory(@PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.changeStatusCategory(categoryId), HttpStatus.OK);
	}
	
}
