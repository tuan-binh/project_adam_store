package back_end.controller;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserRegister;
import back_end.dto.response.JwtResponse;
import back_end.exception.CustomException;
import back_end.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {
	
	@Autowired
	private IUserService userService;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> handleLogin(@RequestBody UserLogin userLogin, HttpSession session) throws CustomException {
		return new ResponseEntity<>(userService.login(session,userLogin), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<String> handleRegister(@RequestBody UserRegister userRegister) throws CustomException {
		userService.register(userRegister);
		return new ResponseEntity<>("Success",HttpStatus.CREATED);
	}
	
}
