package back_end.service.impl;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserRegister;
import back_end.dto.response.JwtResponse;
import back_end.exception.CustomException;
import back_end.model.RoleName;
import back_end.model.Roles;
import back_end.model.Users;
import back_end.repository.IUserRepository;
import back_end.security.jwt.JwtProvider;
import back_end.security.user_principal.UserPrincipal;
import back_end.service.IRoleService;
import back_end.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService implements IUserService {
	
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IRoleService roleService;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtProvider jwtProvider;
	
	@Override
	public JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException {
		Authentication authentication = null;
		try {
			authentication = authenticationManager.authenticate(
					  new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword())
			);
		} catch (AuthenticationException e) {
			Integer count = (Integer) session.getAttribute("count");
			if (count == null) {
				// lần đầu tiền sai mat khau
				session.setAttribute("count", 1);
			} else {
				// khong phai lan dau tien sai
				if (count == 3) {
					// khoa tai khoan
					Users users = findUserByUserName(userLogin.getEmail());
					users.setStatus(false);
					userRepository.save(users);
					throw new CustomException("your account is blocked");
				} else {
					// thuc hien tang count
					session.setAttribute("count", count + 1);
				}
			}
			throw new CustomException("Username or Password is incorrect");
		}
		
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		if (!userPrincipal.isStatus()) {
			throw new CustomException("your account is blocked");
		}
		String token = jwtProvider.generateToken(userPrincipal);
		List<String> roles = userPrincipal.getAuthorities().stream()
				  .map(GrantedAuthority::getAuthority)
				  .collect(Collectors.toList());
		
		return JwtResponse.builder()
				  .token(token)
				  .fullName(userPrincipal.getFullName())
				  .email(userPrincipal.getEmail())
				  .phone(userPrincipal.getPhone())
				  .address(userPrincipal.getAddress())
				  .roles(roles)
				  .status(userPrincipal.isStatus())
				  .build();
	}
	
	@Override
	public void register(UserRegister userRegister) throws CustomException {
		if (userRepository.existsByEmail(userRegister.getEmail())) {
			throw new CustomException("email is exists");
		}
		Set<Roles> roles = new HashSet<>();
		// nếu không truyền lên quyền role sẽ mặc định là role user
		if (userRegister.getRoles() == null || userRegister.getRoles().isEmpty()) {
			roles.add(roleService.findByRoleName(RoleName.ROLE_USER));
		} else {
			userRegister.getRoles().forEach(role -> {
				switch (role) {
					case "admin":
						roles.add(roleService.findByRoleName(RoleName.ROLE_ADMIN));
					case "user":
						roles.add(roleService.findByRoleName(RoleName.ROLE_USER));
						break;
					default:
						try {
							throw new CustomException("role not found");
						} catch (CustomException e) {
							throw new RuntimeException(e);
						}
				}
			});
		}
		userRepository.save(Users.builder()
							 .fullName(userRegister.getFullName())
							 .email(userRegister.getEmail())
							 .password(passwordEncoder.encode(userRegister.getPassword()))
							 .status(true)
							 .roles(roles)
				  .build());
	}
	
	public Users findUserByUserName(String email) throws CustomException {
		Optional<Users> optionalUsers = userRepository.findByEmail(email);
		return optionalUsers.orElseThrow(()->new CustomException("email not found"));
	}
	
}
