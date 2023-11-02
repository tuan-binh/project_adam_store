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

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private IUserService userService;
	
	@GetMapping("/cart")
	public ResponseEntity<List<CartItemResponse>> getCart(Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.getCart(authentication), HttpStatus.OK);
	}
	
	@GetMapping("/favourite")
	public ResponseEntity<List<Product>> getFavourite(Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.getFavourite(authentication), HttpStatus.OK);
	}
	
	@GetMapping("/orders")
	public ResponseEntity<List<OrderResponse>> getOrders(Authentication authentication) {
		return new ResponseEntity<>(userService.getOrders(authentication), HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<UserResponse> updateInformation(@RequestBody UserUpdate userUpdate, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.updateInformation(userUpdate, authentication), HttpStatus.OK);
	}
	
	@PutMapping("/password")
	public ResponseEntity<UserResponse> changePassword(@RequestBody UserPassword userPassword, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(userService.changePassword(userPassword, authentication), HttpStatus.OK);
	}
	
}
