package back_end.service;

import back_end.exception.CustomException;
import org.springframework.security.core.Authentication;

public interface IFavouriteService {
	
	String addProductToFavourite(Long productId, Authentication authentication) throws CustomException;
	
	String removeProductInFavourite(Long productId, Authentication authentication) throws CustomException;
	
}
