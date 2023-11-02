package back_end.service.impl;

import back_end.dto.response.CartItemResponse;
import back_end.exception.CustomException;
import back_end.mapper.OrderMapper;
import back_end.model.*;
import back_end.repository.*;
import back_end.security.user_principal.UserPrinciple;
import back_end.service.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService implements ICartService {
	
	@Autowired
	private IOrderRepository orderRepository;
	@Autowired
	private IOrderDetailRepository orderDetailRepository;
	@Autowired
	private IProductDetailRepository productDetailRepository;
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private OrderMapper orderMapper;
	
	@Override
	public CartItemResponse addProductToCart(Long productDeailId, Authentication authentication) throws CustomException {
		// lấy đối tượng user đã đăng nhập ở đối tượng authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		// lấy ra đối tượng product detail
		ProductDetail productDetail = productDetailRepository.findById(productDeailId).orElseThrow(() -> new CustomException("product detail not found"));
		// thực hiện lấy ra giỏ hàng của người dùng
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrinciple.getId(), false);
		if (optionalOrders.isPresent()) {
			// nếu giỏ hàng tồn tại thì sẽ vào đây
			Orders orders = optionalOrders.get();
			// thực hiện tìm xem trong giỏ hàng có tồn tại sản phẩm đấy trong giỏ hàng hay không
			Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findByProductDetailIdAndOrdersId(productDeailId, orders.getId());
			OrderDetail orderDetail;
			if (optionalOrderDetail.isPresent()) {
				// nếu tồn tại sản phẩm đấy trong giỏ hàng rồi thì sẽ cộng số lượng lên 1
				orderDetail = optionalOrderDetail.get();
				orderDetail.setQuantity(orderDetail.getQuantity() + 1);
			} else {
				// nếu sản phẩm đó chưa tồn tại thì sẽ khởi tạo
				orderDetail = OrderDetail.builder().quantity(1).orders(orders).productDetail(productDetail).build();
			}
			return orderMapper.toCartItem(orderDetailRepository.save(orderDetail));
		}
		// nếu giỏ hàng không tồn tại thì sẽ thực hiện ở đây
		// khởi tạo giỏ hàng
		Orders orders = orderRepository.save(Orders.builder()
				  .orderStatus(OrderStatus.PENDING)
				  .users(userRepository.findById(userPrinciple.getId()).orElseThrow(() -> new CustomException("user not found")))
				  .status(false)
				  .build());
		// khởi tạo đối tượng cartItem và lưu vào database và chuyển nó thành đối tượng response để trả về cho front end
		return orderMapper.toCartItem(orderDetailRepository.save(OrderDetail.builder().quantity(1).orders(orders).productDetail(productDetail).build()));
	}
	
	@Override
	public CartItemResponse changeQuantityInCart(Long cartItemId, int quantity, Authentication authentication) throws CustomException {
		// lấy đối tượng user đã đăng nhập ở đối tượng authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		// lấy dữ liệu đối tượng cart item từ database
		OrderDetail orderDetail = orderDetailRepository.findById(cartItemId).orElseThrow(() -> new CustomException("cart item not found"));
		// check xem orderItem này có phải của người dùng này không
		if (Objects.equals(orderDetail.getOrders().getUsers().getId(), userPrinciple.getId())) {
			orderDetail.setQuantity(quantity);
			return orderMapper.toCartItem(orderDetailRepository.save(orderDetail));
		}
		throw new CustomException("cart item is not yours");
	}
	
	@Override
	public CartItemResponse removeCartItemInCart(Long cartItemId, Authentication authentication) throws CustomException {
		// lấy đối tượng user đã đăng nhập ở đối tượng authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		// lấy dữ liệu đối tượng cart item từ database
		OrderDetail orderDetail = orderDetailRepository.findById(cartItemId).orElseThrow(() -> new CustomException("cart item not found"));
		// check xem orderItem này có phải của người dùng này không
		if (Objects.equals(orderDetail.getOrders().getUsers().getId(), userPrinciple.getId())) {
			orderDetailRepository.deleteById(cartItemId);
			return orderMapper.toCartItem(orderDetail);
		}
		throw new CustomException("cart item is not yours");
	}
	
	@Override
	public List<CartItemResponse> clearCartUser(Authentication authentication) throws CustomException {
		// lấy đối tượng user đã đăng nhập ở đối tượng authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		// lấy giỏ hàng của người dùng ra và xóa tất ả orderDetail có id order như trên
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrinciple.getId(), false);
		if (optionalOrders.isPresent()) {
			// thực hiện xóa tất cả orderDetail có trong giỏ hàng
			orderDetailRepository.deleteAllByOrdersId(optionalOrders.get().getId());
			// trả về giỏ hàng
			return orderDetailRepository.findAllByOrdersId(optionalOrders.get().getId()).stream()
					  .map(item -> orderMapper.toCartItem(item))
					  .collect(Collectors.toList());
		}
		throw new CustomException("your cart is empty");
	}
}
