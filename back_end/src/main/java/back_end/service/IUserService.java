package back_end.service;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserRegister;
import back_end.dto.response.JwtResponse;
import back_end.exception.CustomException;

import javax.servlet.http.HttpSession;

public interface IUserService {

	JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException;
	
	void register(UserRegister userRegister) throws CustomException;

}
