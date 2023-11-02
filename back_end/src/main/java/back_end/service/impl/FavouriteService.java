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
	
	@Override
	public String addProductToFavourite(Long productId, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		users.getFavourite().add(findProductById(productId));
		userRepository.save(users);
		return "Success";
	}
	
	@Override
	public String removeProductInFavourite(Long productId, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		users.getFavourite().remove(findProductById(productId));
		userRepository.save(users);
		return "Success";
	}
	
	public Product findProductById(Long productId) throws CustomException {
		Optional<Product> optionalProduct = productRepository.findById(productId);
		return optionalProduct.orElseThrow(() -> new CustomException("product not found"));
	}
	
}