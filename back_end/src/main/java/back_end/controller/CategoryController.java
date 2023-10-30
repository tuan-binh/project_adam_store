package back_end.controller;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.exception.CustomException;
import back_end.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

	@Autowired
	private ICategoryService categoryService;
	
	@GetMapping
	public ResponseEntity<List<CategoryResponse>> getAllCategories() {
		return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long categoryId) throws CustomException {
		return new ResponseEntity<>(categoryService.findById(categoryId),HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<CategoryResponse> addNewCategory(@RequestAttribute CategoryRequest categoryRequest) {
		return new ResponseEntity<>(categoryService.save(categoryRequest),HttpStatus.CREATED);
	}

}
