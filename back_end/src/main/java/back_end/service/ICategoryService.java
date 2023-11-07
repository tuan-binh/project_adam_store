package back_end.service;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.exception.CustomException;

import java.util.List;
import java.util.Optional;

public interface ICategoryService {
	List<CategoryResponse> findAll(Optional<String> search);
	CategoryResponse findById(Long id) throws CustomException;
	CategoryResponse save(CategoryRequest categoryRequest) throws CustomException;
	CategoryResponse update(CategoryRequest categoryRequest,Long id);
	CategoryResponse changeStatusCategory(Long id) throws CustomException;
}
