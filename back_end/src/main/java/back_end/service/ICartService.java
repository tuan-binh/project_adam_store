package back_end.service;

import back_end.dto.response.CartItemResponse;
import back_end.exception.CustomException;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ICartService {
	
	CartItemResponse addProductToCart(Long productDetailId, Authentication authentication) throws CustomException;
	
	CartItemResponse changeQuantityInCart(Long cartItemId, int quantity, Authentication authentication) throws CustomException;
	
	CartItemResponse removeCartItemInCart(Long cartItemId, Authentication authentication) throws CustomException;
	
	List<CartItemResponse> clearCartUser(Authentication authentication) throws CustomException;
}
