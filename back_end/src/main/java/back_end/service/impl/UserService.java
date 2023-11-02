package back_end.service.impl;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserPassword;
import back_end.dto.request.UserRegister;
import back_end.dto.request.UserUpdate;
import back_end.dto.response.CartItemResponse;
import back_end.dto.response.JwtResponse;
import back_end.dto.response.OrderResponse;
import back_end.dto.response.UserResponse;
import back_end.exception.CustomException;
import back_end.mapper.OrderMapper;
import back_end.mapper.UserMapper;
import back_end.model.*;
import back_end.repository.IOrderDetailRepository;
import back_end.repository.IOrderRepository;
import back_end.repository.IUserRepository;
import back_end.security.jwt.JwtProvider;
import back_end.security.user_principal.UserPrinciple;
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
import java.util.*;
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
	@Autowired
	private IOrderRepository orderRepository;
	@Autowired
	private IOrderDetailRepository orderDetailRepository;
	@Autowired
	private OrderMapper orderMapper;
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException {
		Authentication authentication;
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
					Users users = userRepository.findByEmail(userLogin.getEmail()).orElseThrow(() -> new CustomException("email not found"));
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
		
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
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
	
	@Override
	public List<CartItemResponse> getCart(Authentication authentication) throws CustomException {
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrincipal.getId(), false);
		// trường họp có giỏ hàng thì sẽ trả về những sản phẩm trong giỏ hàng
		if (optionalOrders.isPresent()) {
			return orderDetailRepository.findAllByOrdersId(optionalOrders.get().getId()).stream()
					  .map(item -> orderMapper.toCartItem(item))
					  .collect(Collectors.toList());
		}
		// trường hợp không có giỏ hàng thì sẽ khởi tạo và trả về
		Orders order = orderRepository.save(Orders.builder()
				  .orderStatus(OrderStatus.PENDING)
				  .users(userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new CustomException("user not found")))
				  .status(false)
				  .build());
		return orderDetailRepository.findAllByOrdersId(order.getId()).stream()
				  .map(item -> orderMapper.toCartItem(item))
				  .collect(Collectors.toList());
	}
	
	@Override
	public List<Product> getFavourite(Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		return new ArrayList<>(users.getFavourite());
	}
	
	@Override
	public List<OrderResponse> getOrders(Authentication authentication) {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		return orderRepository.findAllByUsersIdAndStatus(userPrinciple.getId(), true).stream()
				  .map(item -> orderMapper.toOrderResponse(item))
				  .collect(Collectors.toList());
	}
	
	@Override
	public UserResponse updateInformation(UserUpdate userUpdate, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		users.setAddress(userUpdate.getAddress());
		users.setPhone(userUpdate.getPhone());
		return userMapper.toUserResponse(userRepository.save(users));
	}
	
	@Override
	public UserResponse changePassword(UserPassword userPassword, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		if (passwordEncoder.matches(userPassword.getOldPassword(), users.getPassword())) {
			users.setPassword(passwordEncoder.encode(userPassword.getNewPassword()));
		} else {
			throw new CustomException("old password not matches");
		}
		return userMapper.toUserResponse(userRepository.save(users));
	}
}
