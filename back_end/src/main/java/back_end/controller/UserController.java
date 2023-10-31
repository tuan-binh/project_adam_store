package back_end.controller;

import back_end.dto.response.CartItemResponse;
import back_end.exception.CustomException;
import back_end.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
