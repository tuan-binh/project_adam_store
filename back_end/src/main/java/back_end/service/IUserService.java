package back_end.service;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserRegister;
import back_end.dto.response.CartItemResponse;
import back_end.dto.response.JwtResponse;
import back_end.exception.CustomException;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface IUserService {

	JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException;
	
	void register(UserRegister userRegister) throws CustomException;
	
	List<CartItemResponse> getCart(Authentication authentication) throws CustomException;

}
