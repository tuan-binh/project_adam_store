package back_end.service.impl;

import back_end.exception.CustomException;
import back_end.model.Product;
import back_end.model.Users;
import back_end.repository.IProductRepository;
import back_end.repository.IUserRepository;
import back_end.security.user_principal.UserPrinciple;
import back_end.service.IFavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FavouriteService implements IFavouriteService {
	
	@Autowired
	private IProductRepository productRepository;
	@Autowired
	private IUserRepository userRepository;
	
	// chức năng thêm sản phẩm vào danh sách yêu thích của người dùng
	@Override
	public String addProductToFavourite(Long productId, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ đối tượng Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm người dùng trong repository theo ID, nếu không tìm thấy, ném ngoại lệ tùy chỉnh
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		
		// Lấy sản phẩm từ repository dựa trên ID và thêm vào danh sách yêu thích của người dùng
		users.getFavourite().add(findProductById(productId));
		
		// Lưu lại thông tin người dùng đã cập nhật vào repository
		userRepository.save(users);
		
		// Trả về thông báo thành công
		return "Success";
	}
	
	// chức năng xóa sản phẩm trong danh sách yêu thích của người dùng
	@Override
	public String removeProductInFavourite(Long productId, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ đối tượng Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm người dùng trong repository theo ID, nếu không tìm thấy, ném ngoại lệ tùy chỉnh
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		
		// Lấy sản phẩm từ repository dựa trên ID và loại bỏ khỏi danh sách yêu thích của người dùng
		users.getFavourite().remove(findProductById(productId));
		
		// Lưu lại thông tin người dùng đã cập nhật vào repository
		userRepository.save(users);
		
		// Trả về thông báo thành công
		return "Success";
	}
	
	// chức năng tìm kiếm sản phẩm
	public Product findProductById(Long productId) throws CustomException {
		// Tìm kiếm sản phẩm trong repository dựa trên ID. Nếu không tìm thấy, ném ngoại lệ tùy chỉnh
		Optional<Product> optionalProduct = productRepository.findById(productId);
		return optionalProduct.orElseThrow(() -> new CustomException("product not found"));
	}
	
}