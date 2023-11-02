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
	
	
	@Override
	public OrderResponse checkoutCart(CheckoutRequest checkoutRequest, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Optional<Orders> optionalOrders = orderRepository.findByUsersIdAndStatus(userPrinciple.getId(), false);
		if (optionalOrders.isPresent()) {
			// lấy đối tượng cart của người dùng ra
			Orders orders = optionalOrders.get();
			// lấy các sản phẩm trong giỏ hàng ra và kiểm tra xem có sản phẩm trong giỏ hàng không
			List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrdersId(orders.getId());
			if (orderDetails.isEmpty()) {
				throw new CustomException("your cart is empty");
			}
			// nếu có sản phẩm trong giỏ hàng thì sẽ thực hiện check out
			// thực hiện ghi dữ liệu giá tiền vào database khi thực hiện thanh toán
			for (OrderDetail item : orderDetails) {
				item.setPrice(item.getProductDetail().getPrice());
				orderDetailRepository.save(item);
			}
			orders.setTime(new Date());
			orders.setStatus(true);
			orders.setOrderStatus(OrderStatus.PREPARE);
			
			Coupon coupon = null;
			if (checkoutRequest.getCouponId() != null) {
				coupon = couponRepository.findById(checkoutRequest.getCouponId()).orElseThrow(() -> new CustomException("coupon not found"));
			}
			
			if (checkoutRequest.getAddress() == null || checkoutRequest.getPhone() == null) {
				if (userPrinciple.getAddress() == null || userPrinciple.getPhone() == null) {
					throw new CustomException("you must update your information");
				}
				// check out với thông tin có sẵn trong tài khoản
				orders.setLocation(userPrinciple.getAddress());
				orders.setPhone(userPrinciple.getPhone());
			} else {
				// check out với thông tin khi nhập vào form ở phía front end
				orders.setLocation(checkoutRequest.getAddress());
				orders.setPhone(checkoutRequest.getPhone());
			}
			// thực hiển tính tổng tiền
			orders.setTotal(orderDetails.stream().map(item -> item.getPrice() * item.getQuantity()).reduce(0.0, Double::sum));
			// thực hiện kiểm tra xem có áp mã giảm giá không nếu không thì bỏ qua
			if (coupon != null) {
				boolean check = checkDateCoupon(coupon);
				if (check) {
					// nếu có tồn tại sẽ kiểm tra còn số lượng không
					if (coupon.getStock() == 0) {
						// nếu số lượng không còn thì sẽ chuyển nó về trạng thái ẩn đi ( false )
						coupon.setStatus(false);
						couponRepository.save(coupon);
						throw new CustomException("i don't have this coupon");
					}
					// nếu còn thì sẽ thực hiện set vào order và thực hiển giảm giá tổng số tiền theo coupon và giảm đi 1 cái ở coupon ( stock )
					orders.setCoupon(coupon);
					orders.setTotal(orders.getTotal() - (orders.getTotal() * coupon.getPercent()));
					coupon.setStock(coupon.getStock() - 1);
					couponRepository.save(coupon);
				} else {
					throw new CustomException("Discount code has expired");
				}
			}
			minusStockProductWhenCheckout(orders.getId());
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		throw new CustomException("your cart is empty");
	}
	
	@Override
	public List<OrderItemResponse> getOrderItemByOrderId(Long orderId, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			return orderDetailRepository.findAllByOrdersId(orderId).stream()
					  .map(item -> orderMapper.toOrderItem(item))
					  .collect(Collectors.toList());
		}
		throw new CustomException("you can't watch this order");
	}
	
	@Override
	public OrderResponse cancelOrder(Long orderId, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			if (orders.getOrderStatus().equals(OrderStatus.PREPARE)) {
				returnStockProductWhenCancel(orderId);
				orders.setOrderStatus(OrderStatus.CANCEL);
				return orderMapper.toOrderResponse(orderRepository.save(orders));
			}
			throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
		}
		throw new CustomException("this order you don't have");
	}
	
	@Override
	public OrderResponse deliveryOrder(Long orderId) throws CustomException {
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (orders.getOrderStatus().equals(OrderStatus.PREPARE)) {
			orders.setOrderStatus(OrderStatus.DELIVERY);
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
	}
	
	@Override
	public OrderResponse success(Long orderId) throws CustomException {
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (orders.getOrderStatus().equals(OrderStatus.DELIVERY)) {
			orders.setOrderStatus(OrderStatus.SUCCESS);
			upBoughtInProduct(orderId);
			return orderMapper.toOrderResponse(orderRepository.save(orders));
		}
		throw new CustomException("you can't cancel this order because order in " + orders.getOrderStatus());
	}
	
	public boolean checkDateCoupon(Coupon coupon) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate startDateCoupon = LocalDate.parse(coupon.getStartDate().toString(), formatter);
		LocalDate endDateCoupon = LocalDate.parse(coupon.getEndDate().toString(), formatter);
		LocalDate timeNow = LocalDate.now();
		return !timeNow.isAfter(endDateCoupon) && !timeNow.isBefore(startDateCoupon);
	}
	
	public void minusStockProductWhenCheckout(Long orderId) throws CustomException {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			if (od.getQuantity() > od.getProductDetail().getStock()) {
				throw new CustomException("not enough quantity");
			}
			od.getProductDetail().setStock(od.getProductDetail().getStock() - od.getQuantity());
			productDetailRepository.save(od.getProductDetail());
		}
	}
	
	public void returnStockProductWhenCancel(Long orderId) {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			od.getProductDetail().setStock(od.getProductDetail().getStock() + od.getQuantity());
			productDetailRepository.save(od.getProductDetail());
		}
	}
	
	public void upBoughtInProduct(Long orderId) {
		for (OrderDetail od : orderDetailRepository.findAllByOrdersId(orderId)) {
			od.getProductDetail().getProduct().setBought(od.getProductDetail().getProduct().getBought() + od.getQuantity());
			productRepository.save(od.getProductDetail().getProduct());
		}
	}
	
}
