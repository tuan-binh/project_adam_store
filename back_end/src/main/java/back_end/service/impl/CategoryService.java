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
	
	// chức năng lấy tất cả các thông tin của thể loại sản phẩm có trong hệ thống
	@Override
	public List<CategoryResponse> findAll(String search) {
		// Khai báo danh sách chứa đối tượng CategoryResponse
		List<CategoryResponse> list;

		// Kiểm tra nếu tham số tìm kiếm trống
		if (search.isEmpty()) {
			// Nếu trống, lấy tất cả các danh mục từ repository và ánh xạ sang CategoryResponse
			list = categoryRepository.findAll().stream()
					  .map(item -> categoryMapper.toResponse(item))
					  .collect(Collectors.toList());
		} else {
			// Nếu không trống, lấy danh sách các danh mục có tên chứa giá trị của tham số tìm kiếm (không phân biệt chữ hoa chữ thường)
			// và ánh xạ sang CategoryResponse
			list = categoryRepository.findAllByCategoryNameContainingIgnoreCase(search).stream()
					  .map(item -> categoryMapper.toResponse(item))
					  .collect(Collectors.toList());
		}

		// Trả về danh sách CategoryResponse tùy thuộc vào giá trị của tham số tìm kiếm
		return list;
	}
	
	// chức năng lấy thông tin thể loai sản phẩm theo id
	@Override
	public CategoryResponse findById(Long id) throws CustomException {
		// Tìm kiếm danh mục theo ID. Nếu tìm thấy, ánh xạ kết quả sang CategoryResponse bằng cách sử dụng một mapper
		// Nếu không tìm thấy, ném một ngoại lệ tùy chỉnh thông báo rằng danh mục không được tìm thấy
		Optional<Category> optionalCategory = categoryRepository.findById(id);
		return optionalCategory.map(item -> categoryMapper.toResponse(item)).orElseThrow(() -> new CustomException("category not found"));
	}
	
	// chức năng thêm thể loại sản phẩm mới
	@Override
	public CategoryResponse save(CategoryRequest categoryRequest) throws CustomException {
		// Nếu đã tồn tại một danh mục với tên tương ứng (không phân biệt chữ hoa chữ thường), ném một ngoại lệ tùy chỉnh
		// Ngược lại, ánh xạ danh mục từ CategoryRequest, lưu và ánh xạ kết quả sang CategoryResponse
		// xem tên khi thêm vào đã có tồn tại trong hệ thống ko nếu có bắn ra một ngoại lệ
		if (categoryRepository.existsByCategoryNameIgnoreCase(categoryRequest.getCategoryName())) {
			throw new CustomException("categoryName is exists");
		}
		return categoryMapper.toResponse(categoryRepository.save(categoryMapper.toEntity(categoryRequest)));
	}
	
	// chức năng update thể loại sản phẩm theo id
	@Override
	public CategoryResponse update(CategoryRequest categoryRequest, Long id) throws CustomException {
		// Ánh xạ danh mục từ CategoryRequest, đặt ID và kiểm tra tên danh mục cập nhật
		// Nếu tên giống với tên hiện có, cập nhật và trả về danh mục
		// Nếu tên không giống và đã tồn tại một danh mục với tên cập nhật, ném một ngoại lệ tùy chỉnh
		// Ngược lại, cập nhật và trả về danh mục
		Category category = categoryMapper.toEntity(categoryRequest);
		category.setId(id);
		if (categoryRequest.getCategoryName().toUpperCase().equals(categoryRepository.findById(id).orElseThrow(() -> new CustomException("category not found")).getCategoryName())) {
			return categoryMapper.toResponse(categoryRepository.save(category));
		}
		if (categoryRepository.existsByCategoryNameIgnoreCase(category.getCategoryName())) {
			throw new CustomException("categoryName is exists");
		}
		return categoryMapper.toResponse(categoryRepository.save(category));
	}
	
	// chức năng thay đổi trạng thái của thể loại sản phẩm ( true or false )
	@Override
	public CategoryResponse changeStatusCategory(Long id) throws CustomException {
		// Tìm kiếm danh mục theo ID. Nếu tìm thấy, thay đổi trạng thái và trả về danh mục đã cập nhật
		// Nếu không tìm thấy, ném một ngoại lệ tùy chỉnh thông báo rằng danh mục không được tìm thấy
		Optional<Category> optionalCategory = categoryRepository.findById(id);
		if (optionalCategory.isPresent()) {
			Category category = optionalCategory.get();
			category.setStatus(!category.isStatus());
			return categoryMapper.toResponse(categoryRepository.save(category));
		}
		throw new CustomException("category not found");
	}
}
