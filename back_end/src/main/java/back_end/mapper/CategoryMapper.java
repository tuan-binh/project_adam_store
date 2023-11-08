package back_end.mapper;

import back_end.dto.request.CategoryRequest;
import back_end.dto.response.CategoryResponse;
import back_end.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper implements IGenericMapper<Category, CategoryRequest, CategoryResponse> {
	@Override
	public Category toEntity(CategoryRequest categoryRequest) {
		return Category.builder()
				  .categoryName(categoryRequest.getCategoryName().toUpperCase())
				  .status(categoryRequest.isStatus())
				  .build();
	}
	
	@Override
	public CategoryResponse toResponse(Category category) {
		return CategoryResponse.builder()
				  .id(category.getId())
				  .categoryName(category.getCategoryName().toUpperCase())
				  .status(category.isStatus())
				  .build();
	}
}
