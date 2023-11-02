package back_end.mapper;

import back_end.dto.response.CartItemResponse;
import back_end.dto.response.OrderItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.model.OrderDetail;
import back_end.model.Orders;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
	
	public CartItemResponse toCartItem(OrderDetail orderDetail) {
		return CartItemResponse.builder()
				  .id(orderDetail.getId())
				  .productDetail(orderDetail.getProductDetail())
				  .quantity(orderDetail.getQuantity())
				  .build();
	}
	
	public OrderItemResponse toOrderItem(OrderDetail orderDetail) {
		return OrderItemResponse.builder()
				  .id(orderDetail.getId())
				  .productDetail(orderDetail.getProductDetail())
				  .price(orderDetail.getPrice())
				  .quantity(orderDetail.getQuantity())
				  .build();
	}
	
	public OrderResponse toOrderResponse(Orders orders) {
		return OrderResponse.builder()
				  .id(orders.getId())
				  .orderStatus(orders.getOrderStatus())
				  .time(orders.getTime())
				  .location(orders.getLocation())
				  .phone(orders.getPhone())
				  .total(orders.getTotal())
				  .coupon(orders.getCoupon())
				  .rating(orders.getRating())
				  .status(orders.isStatus())
				  .build();
	}
	
}
