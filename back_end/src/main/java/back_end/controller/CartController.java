package back_end.controller;

import back_end.dto.response.CartItemResponse;
import back_end.exception.CustomException;
import back_end.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {
	
	@Autowired
	private ICartService cartService;
	
	@PostMapping("/{productDetailId}")
	public ResponseEntity<CartItemResponse> addProductToCart(@PathVariable Long productDetailId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(cartService.addProductToCart(productDetailId, authentication), HttpStatus.CREATED);
	}
	
	@PutMapping("/{cartItemId}")
	public ResponseEntity<CartItemResponse> changeQuantityCartItem(@PathVariable Long cartItemId, @RequestParam("quantity") Integer quantity, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(cartService.changeQuantityInCart(cartItemId, quantity, authentication), HttpStatus.OK);
	}
	
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<CartItemResponse> removeCartItemInCart(@PathVariable Long cartItemId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(cartService.removeCartItemInCart(cartItemId, authentication), HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<List<CartItemResponse>> clearCartInUser(Authentication authentication) throws CustomException {
		return new ResponseEntity<>(cartService.clearCartUser(authentication), HttpStatus.OK);
	}
	
}
