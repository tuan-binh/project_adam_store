package back_end.service;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserPassword;
import back_end.dto.request.UserRegister;
import back_end.dto.request.UserUpdate;
import back_end.dto.response.*;
import back_end.exception.CustomException;
import back_end.model.Product;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface IUserService {
	
	JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException;
	
	void register(UserRegister userRegister) throws CustomException;
	
	List<CartItemResponse> getCart(Authentication authentication) throws CustomException;
	
	List<ProductResponse> getFavourite(Authentication authentication) throws CustomException;
	
	List<OrderResponse> getOrders(Authentication authentication);
	
	UserResponse updateInformation(UserUpdate userUpdate, Authentication authentication) throws CustomException;
	
	UserResponse changePassword(UserPassword userPassword, Authentication authentication) throws CustomException;
	
}
