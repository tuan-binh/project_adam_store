package back_end.controller;

import back_end.exception.CustomException;
import back_end.service.IFavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/favourite")
@CrossOrigin("*")
public class FavouriteController {
	
	@Autowired
	private IFavouriteService favouriteService;
	
	// chức năng thêm sản phẩm vào danh sách yêu thích của người dùng
	@PostMapping("/{productId}")
	public ResponseEntity<String> addProductToFavourite(@PathVariable Long productId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(favouriteService.addProductToFavourite(productId, authentication), HttpStatus.CREATED);
	}
	
	// chức năng xóa sản phẩm trong danh sách yêu thích của người dùng
	@DeleteMapping("/{productId}")
	public ResponseEntity<String> removeProductInFavourite(@PathVariable Long productId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(favouriteService.removeProductInFavourite(productId, authentication), HttpStatus.OK);
	}
	
}
