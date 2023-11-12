package back_end.service.impl;

import back_end.dto.request.UserLogin;
import back_end.dto.request.UserPassword;
import back_end.dto.request.UserRegister;
import back_end.dto.request.UserUpdate;
import back_end.dto.response.*;
import back_end.exception.CustomException;
import back_end.mapper.OrderMapper;
import back_end.mapper.ProductMapper;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
	private ProductMapper productMapper;
	@Autowired
	private UserMapper userMapper;
	
	// login
	@Override
	public JwtResponse login(HttpSession session, UserLogin userLogin) throws CustomException {
		Authentication authentication;
		try {
			// Thực hiện xác thực người dùng thông qua UsernamePasswordAuthenticationToken
			authentication = authenticationManager.authenticate(
					  new UsernamePasswordAuthenticationToken(userLogin.getEmail(), userLogin.getPassword())
			);
		} catch (AuthenticationException e) {
			// Xử lý khi xác thực thất bại, kiểm tra số lần nhập sai mật khẩu để quyết định khoá tài khoản
			Integer count = (Integer) session.getAttribute("count");
			if (count == null) {
				// Lần đầu tiên nhập sai mật khẩu
				session.setAttribute("count", 1);
			} else {
				// Không phải lần đầu tiên nhập sai
				if (count == 3) {
					// Khi số lần nhập sai đạt mức 3, khoá tài khoản
					Users users = userRepository.findByEmail(userLogin.getEmail()).orElseThrow(() -> new CustomException("email not found"));
					users.setStatus(false);
					userRepository.save(users);
					throw new CustomException("your account is blocked");
				} else {
					// Tăng số lần nhập sai
					session.setAttribute("count", count + 1);
				}
			}
			throw new CustomException("Username or Password is incorrect");
		}
		
		// Lấy thông tin người dùng từ Principal và kiểm tra trạng thái tài khoản
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
		if (!userPrincipal.isStatus()) {
			throw new CustomException("your account is blocked");
		}
		
		// Tạo token JWT và trả về thông tin người dùng
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
				  .favourite(getFavourite(authentication).stream().map(ProductResponse::getId).collect(Collectors.toList()))
				  .status(userPrincipal.isStatus())
				  .build();
	}
	
	// register
	@Override
	public void register(UserRegister userRegister) throws CustomException {
		// Kiểm tra xem email đã tồn tại chưa
		if (userRepository.existsByEmail(userRegister.getEmail())) {
			throw new CustomException("email is exists");
		}
		Set<Roles> roles = new HashSet<>();
		
		// Nếu không có quyền được truyền lên, mặc định là role user
		if (userRegister.getRoles() == null || userRegister.getRoles().isEmpty()) {
			roles.add(roleService.findByRoleName(RoleName.ROLE_USER));
		} else {
			// Xác định quyền dựa trên danh sách quyền được truyền lên
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
		
		// Lưu người dùng mới vào cơ sở dữ liệu
		userRepository.save(Users.builder()
				  .fullName(userRegister.getFullName())
				  .email(userRegister.getEmail())
				  .password(passwordEncoder.encode(userRegister.getPassword()))
				  .status(true)
				  .roles(roles)
				  .build());
	}
	
	// chức năng lấy thông tin giỏ hàng của người dùng đang đăng nhập
	@Override
	public List<CartItemResponse> getCart(Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ Principal
		UserPrinciple userPrincipal = (UserPrinciple) authentication.getPrincipal();
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrincipal.getId(), false);
		
		// Trường hợp có giỏ hàng, trả về danh sách sản phẩm trong giỏ hàng
		if (optionalOrders.isPresent()) {
			return orderDetailRepository.findAllByOrdersId(optionalOrders.get().getId()).stream()
					  .map(item -> orderMapper.toCartItem(item))
					  .collect(Collectors.toList());
		}
		
		// Trường hợp không có giỏ hàng, khởi tạo giỏ hàng mới và trả về
		Orders order = orderRepository.save(Orders.builder()
				  .orderStatus(OrderStatus.PENDING)
				  .users(userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new CustomException("user not found")))
				  .status(false)
				  .build());
		return orderDetailRepository.findAllByOrdersId(order.getId()).stream()
				  .map(item -> orderMapper.toCartItem(item))
				  .collect(Collectors.toList());
	}
	
	// chức năng lấy thông tin danh sách yêu thích của người dùng đang đăng nhập
	@Override
	public List<ProductResponse> getFavourite(Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ Principal
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		
		// Trả về danh sách sản phẩm yêu thích
		return users.getFavourite().stream().map(item -> productMapper.toResponse(item)).collect(Collectors.toList());
	}
	
	// chức năng lấy thông tin danh sách thông tin orders của người dùng đang đăng nhập
	@Override
	public Page<OrderResponse> getOrders(Pageable pageable, Authentication authentication,String orderStatus) {
		// Lấy thông tin người dùng từ Principal
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Page<OrderResponse> list;
		// Trả về danh sách đơn hàng của người dùng
		if(orderStatus.equals("ALL")) {
			list = orderRepository.findAllByUsersIdAndStatus(userPrinciple.getId(),true,pageable).map(item -> orderMapper.toOrderResponse(item));
		} else {
			OrderStatus convertOrderStatus = OrderStatus.valueOf(orderStatus);
			list = orderRepository.findAllByUsersIdAndStatusAndOrderStatus(userPrinciple.getId(),true,pageable,convertOrderStatus).map(item -> orderMapper.toOrderResponse(item));
		}
		return list;
	}
	
	// chức năng update thông tin người dùng đang đăng nhập
	@Override
	public UserResponse updateInformation(UserUpdate userUpdate, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ Principal
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		// check xem số điện thoại có bị trùng ko nếu trùng sẽ ném ra ngoại lên CustomException
		if (userRepository.existsByPhone(userUpdate.getPhone()) && !userUpdate.getPhone().equals(userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found")).getPhone())) {
			throw new CustomException("phone is exists");
		}
		// Cập nhật địa chỉ và số điện thoại của người dùng
		users.setFullName(userUpdate.getFullName());
		users.setAddress(userUpdate.getAddress());
		users.setPhone(userUpdate.getPhone());
		
		// Trả về thông tin người dùng sau khi cập nhật
		return userMapper.toUserResponse(userRepository.save(users));
	}
	
	// chức năng thay đổi mật khẩu của người dùng
	@Override
	public UserResponse changePassword(UserPassword userPassword, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ Principal
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Users users = userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found"));
		
		// Kiểm tra mật khẩu cũ có khớp hay không
		if (passwordEncoder.matches(userPassword.getOldPassword(), users.getPassword())) {
			// Nếu khớp, cập nhật mật khẩu mới và trả về thông tin người dùng
			users.setPassword(passwordEncoder.encode(userPassword.getNewPassword()));
		} else {
			// Nếu không khớp, ném CustomException
			throw new CustomException("old password not matches");
		}
		
		return userMapper.toUserResponse(userRepository.save(users));
	}
}
