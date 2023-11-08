package back_end.service.impl;

import back_end.dto.request.CheckoutRequest;
import back_end.dto.response.OrderItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.exception.CustomException;
import back_end.mapper.OrderMapper;
import back_end.model.Coupon;
import back_end.model.OrderDetail;
import back_end.model.OrderStatus;
import back_end.model.Orders;
import back_end.repository.*;
import back_end.security.user_principal.UserPrinciple;
import back_end.service.IOrderService;
import org.hibernate.criterion.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService implements IOrderService {
	
	@Autowired
	private IOrderRepository orderRepository;
	@Autowired
	private IOrderDetailRepository orderDetailRepository;
	@Autowired
	private ICouponRepository couponRepository;
	@Autowired
	private IProductDetailRepository productDetailRepository;
	@Autowired
	private IProductRepository productRepository;
	@Autowired
	private OrderMapper orderMapper;
	
	// chức năng check out giỏ hàng của nguười dùng đang nhập
	@Override
	public OrderResponse checkoutCart(CheckoutRequest checkoutRequest, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ đối tượng Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm đơn hàng chưa thanh toán của người dùng
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrinciple.getId(), false);
		
		// Kiểm tra xem đơn hàng chưa thanh toán có tồn tại hay không
		if (optionalOrders.isPresent()) {
			// Nếu tồn tại, lấy đối tượng đơn hàng ra
			Orders orders = optionalOrders.get();
			
			// Lấy danh sách chi tiết đơn hàng (sản phẩm trong giỏ hàng)
			List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrdersId(orders.getId());
			
			// Kiểm tra xem có sản phẩm trong giỏ hàng không
			if (orderDetails.isEmpty()) {
				throw new CustomException("your cart is empty");
			}
			
			// Ghi giá tiền vào cơ sở dữ liệu khi thực hiện thanh toán
			for (OrderDetail item : orderDetails) {
				item.setPrice(item.getProductDetail().getPrice());
				orderDetailRepository.save(item);
			}
			
			// Cập nhật thông tin đơn hàng và đánh dấu đã thanh toán
			orders.setTime(new Date());
			orders.setStatus(true);
			orders.setOrderStatus(OrderStatus.PREPARE);
			
			// Kiểm tra xem có mã giảm giá được áp dụng không
			Coupon coupon = null;
			if (checkoutRequest.getCouponId() != null) {
				coupon = couponRepository.findById(checkoutRequest.getCouponId()).orElseThrow(() -> new CustomException("coupon not found"));
			}
			
			// Kiểm tra và cập nhật thông tin đơn hàng dựa trên địa chỉ và điện thoại nhập từ form hoặc thông tin có sẵn trong tài khoản
			if (checkoutRequest.getAddress() == null || checkoutRequest.getPhone() == null) {
				if (userPrinciple.getAddress() == null || userPrinciple.getPhone() == null) {
					throw new CustomException("you must update your information");
				}
				orders.setAddress(userPrinciple.getAddress());
				orders.setCustomer(userPrinciple.getFullName());
				orders.setPhone(userPrinciple.getPhone());
			} else {
				orders.setAddress(checkoutRequest.getAddress());
				orders.setCustomer(checkoutRequest.getCustomer());
				orders.setPhone(checkoutRequest.getPhone());
			}
			
			// Tính tổng tiền đơn hàng
			orders.setTotal(orderDetails.stream().map(item -> item.getPrice() * item.getQuantity()).reduce(0.0, Double::sum));
			
			// Kiểm tra và áp dụng mã giảm giá nếu có
			if (coupon != null) {
				boolean check = checkDateCoupon(coupon);
				if (check) {
					if (coupon.getStock() == 0) {
						coupon.setStatus(false);
						couponRepository.save(coupon);
						throw new CustomException("i don't have this coupon");
					}
					orders.setCoupon(coupon);
					orders.setTotal(orders.getTotal() - (orders.getTotal() * coupon.getPercent()));
					coupon.setStock(coupon.getStock() - 1);
					couponRepository.save(coupon);
				} else {
					throw new CustomException("Discount code has expired");
				}
			}
			
			// Giảm số lượng tồn kho của sản phẩm khi thanh toán
			minusStockProductWhenCheckout(orders.getId());
			
			// Lưu và trả về đối tượng OrderResponse
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		
		// Nếu đơn hàng chưa thanh toán không tồn tại, ném ngoại lệ tùy chỉnh
		throw new CustomException("your cart is empty");
	}
	
	// chức năng lấy ra những sản phẩm có trong order ( hóa đơn ) một danh sách sản phẩm trong hóa đơn
	@Override
	public List<OrderItemResponse> getOrderItemByOrderId(Long orderId, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ đối tượng Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm đơn hàng dựa trên ID đơn hàng
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem người dùng có quyền xem chi tiết đơn hàng này hay không
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			// Nếu có, lấy danh sách chi tiết đơn hàng và ánh xạ sang OrderItemResponse
			return orderDetailRepository.findAllByOrdersId(orderId).stream()
					  .map(item -> orderMapper.toOrderItem(item))
					  .collect(Collectors.toList());
		}
		
		// Nếu không có quyền, ném ngoại lệ tùy chỉnh
		throw new CustomException("you can't watch this order");
	}
	
	// chức năng hủy đơn hàng đó chuyển nó về trạng thái CANCEL
	@Override
	public OrderResponse cancelOrder(Long orderId, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng từ đối tượng Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm đơn hàng dựa trên ID đơn hàng
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem người dùng có quyền hủy đơn hàng này hay không
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			// Kiểm tra xem đơn hàng có ở trạng thái chuẩn bị (PREPARE) hay không
			if (orders.getOrderStatus().equals(OrderStatus.PREPARE)) {
				// Trả lại số lượng tồn kho cho sản phẩm khi hủy đơn hàng
				returnStockProductWhenCancel(orderId);
				
				// Cập nhật trạng thái đơn hàng thành đã hủy (CANCEL) và lưu vào cơ sở dữ liệu
				orders.setOrderStatus(OrderStatus.CANCEL);
				return orderMapper.toOrderResponse(orderRepository.save(orders));
			}
			
			// Nếu không ở trạng thái chuẩn bị, ném ngoại lệ tùy chỉnh
			throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
		}
		
		// Nếu không có quyền, ném ngoại lệ tùy chỉnh
		throw new CustomException("this order you don't have");
	}
	
	// chức năng chuyển trạng thái giao hàng ( chuyển trạng thái đơn hàng sang trạng thái giao hàng )
	@Override
	public OrderResponse deliveryOrder(Long orderId) throws CustomException {
		// Tìm kiếm đơn hàng dựa trên ID đơn hàng
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem đơn hàng ở trạng thái chuẩn bị (PREPARE) hay không
		if (orders.getOrderStatus().equals(OrderStatus.PREPARE)) {
			// Cập nhật trạng thái đơn hàng thành đã giao hàng (DELIVERY) và lưu vào cơ sở dữ liệu
			orders.setOrderStatus(OrderStatus.DELIVERY);
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		
		// Nếu không ở trạng thái chuẩn bị, ném ngoại lệ tùy chỉnh
		throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
	}
	
	// chức năng chuyển trạng thái thành công ( chuyển trạng thái đơn hàng sang SUCCESS thành công cũng như giao hàng thành công )
	@Override
	public OrderResponse success(Long orderId) throws CustomException {
		// Tìm kiếm đơn hàng dựa trên ID đơn hàng
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem đơn hàng ở trạng thái giao hàng (DELIVERY) hay không
		if (orders.getOrderStatus().equals(OrderStatus.DELIVERY)) {
			// Cập nhật trạng thái đơn hàng thành thành công (SUCCESS) và lưu vào cơ sở dữ liệu
			orders.setOrderStatus(OrderStatus.SUCCESS);
			
			// Tăng số lượng đã mua cho sản phẩm khi đơn hàng thành công
			upBoughtInProduct(orderId);
			
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		
		// Nếu không ở trạng thái giao hàng, ném ngoại lệ tùy chỉnh
		throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
	}
	
	// Phương thức kiểm tra xem mã giảm giá có hợp lệ hay không
	public boolean checkDateCoupon(Coupon coupon) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDateCoupon = LocalDate.parse(coupon.getStartDate().toString(), formatter);
		LocalDate endDateCoupon = LocalDate.parse(coupon.getEndDate().toString(), formatter);
		LocalDate timeNow = LocalDate.now();
		return !timeNow.isAfter(endDateCoupon) && !timeNow.isBefore(startDateCoupon);
	}
	
	// Phương thức giảm số lượng tồn kho của sản phẩm khi thanh toán đơn hàng
	public void minusStockProductWhenCheckout(Long orderId) throws CustomException {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			if (od.getQuantity() > od.getProductDetail().getStock()) {
				throw new CustomException("not enough quantity");
			}
			od.getProductDetail().setStock(od.getProductDetail().getStock() - od.getQuantity());
			productDetailRepository.save(od.getProductDetail());
		}
	}
	
	// Phương thức trả lại số lượng tồn kho của sản phẩm khi hủy đơn hàng
	public void returnStockProductWhenCancel(Long orderId) {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			od.getProductDetail().setStock(od.getProductDetail().getStock() + od.getQuantity());
			productDetailRepository.save(od.getProductDetail());
		}
	}
	
	// Phương thức tăng số lượng đã mua
	public void upBoughtInProduct(Long orderId) {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			od.getProductDetail().getProduct().setBought(od.getProductDetail().getProduct().getBought() + od.getQuantity());
			productRepository.save(od.getProductDetail().getProduct());
		}
	}
	
}
