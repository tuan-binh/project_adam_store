package back_end.service;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface ICategoryService {
	List<CategoryResponse> findAll();
	CategoryResponse findById(Long id) throws CustomException;
	CategoryResponse save(CategoryRequest categoryRequest);
}
