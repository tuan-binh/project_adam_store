package back_end.service.impl;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.exception.CustomException;
import back_end.mapper.CategoryMapper;
import back_end.model.Category;
import back_end.repository.ICategoryRepository;
import back_end.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService implements ICategoryService {
	
	@Autowired
	private ICategoryRepository categoryRepository;
	@Autowired
	private CategoryMapper categoryMapper;
	
	@Override
	public List<CategoryResponse> findAll() {
		return categoryRepository.findAll().stream()
				  .map(item -> categoryMapper.toResponse(item))
				  .collect(Collectors.toList());
	}
	
	@Override
	public CategoryResponse findById(Long id) throws CustomException {
		Optional<Category> optionalCategory = categoryRepository.findById(id);
		return optionalCategory.map(item -> categoryMapper.toResponse(item)).orElseThrow(()->new CustomException("category not found"));
	}
	
	@Override
	public CategoryResponse save(CategoryRequest categoryRequest) {
		return categoryMapper.toResponse(categoryRepository.save(categoryMapper.toEntity(categoryRequest)));
	}
}
