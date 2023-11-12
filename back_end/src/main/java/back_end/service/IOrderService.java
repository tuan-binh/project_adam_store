package back_end.service;

import back_end.dto.request.CheckoutRequest;
import back_end.dto.response.OrderItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.exception.CustomException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface IOrderService {
	
	Page<OrderResponse> getAllOrderByAdmin(Pageable pageable,String orderStatus,String search);
	
	OrderResponse checkoutCart(CheckoutRequest checkoutRequest, Authentication authentication) throws CustomException;
	
	List<OrderItemResponse> getOrderItemByOrderId(Long orderId) throws CustomException;
	
	OrderResponse cancelOrder(Long orderId, Authentication authentication) throws CustomException;
	
	OrderResponse deliveryOrder(Long orderId) throws CustomException;
	
	OrderResponse success(Long orderId) throws CustomException;
	
}
