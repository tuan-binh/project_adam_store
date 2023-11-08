package back_end.controller;

import back_end.dto.request.UserPassword;
import back_end.dto.request.UserUpdate;
import back_end.dto.response.CartItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.dto.response.UserResponse;
import back_end.exception.CustomException;
import back_end.model.Product;
import back_end.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	
	// chức năng lấy thông tin giỏ hàng của người dùng đang đăng nhập
	@GetMapping("/cart")
	public ResponseEntity<List<CartItemResponse>> getCart(Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.getCart(authentication), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin danh sách yêu thích của người dùng đang đăng nhập
	@GetMapping("/favourite")
	public ResponseEntity<List<Product>> getFavourite(Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.getFavourite(authentication), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin danh sách thông tin orders của người dùng đang đăng nhập
	@GetMapping("/orders")
	public ResponseEntity<List<OrderResponse>> getOrders(Authentication authentication) {
		return new ResponseEntity<>(userService.getOrders(authentication), HttpStatus.OK);
	}
	
	// chức năng update thông tin người dùng đang đăng nhập
	@PutMapping("/update")
	public ResponseEntity<UserResponse> updateInformation(@RequestBody UserUpdate userUpdate, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.updateInformation(userUpdate, authentication), HttpStatus.OK);
	}
	
	// chức năng thay đổi mật khẩu của người dùng
	@PutMapping("/password")
	public ResponseEntity<UserResponse> changePassword(@RequestBody UserPassword userPassword, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.changePassword(userPassword, authentication), HttpStatus.OK);
	}
	
}
