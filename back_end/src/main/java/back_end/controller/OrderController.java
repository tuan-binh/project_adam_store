package back_end.controller;

import back_end.dto.request.CheckoutRequest;
import back_end.dto.response.OrderItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.exception.CustomException;
import back_end.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
	
	@Autowired
	private IOrderService orderService;
	
	@PutMapping("/checkout")
	public ResponseEntity<OrderResponse> checkoutOrder(@RequestBody CheckoutRequest checkoutRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(orderService.checkoutCart(checkoutRequest, authentication), HttpStatus.OK);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity<List<OrderItemResponse>> getAllOrderItemByOrderId(@PathVariable Long orderId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(orderService.getOrderItemByOrderId(orderId, authentication), HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/cancel")
	
	public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long orderId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(orderService.cancelOrder(orderId, authentication), HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/delivery")
	public ResponseEntity<OrderResponse> deliveryOrder(@PathVariable Long orderId) throws CustomException {
		return new ResponseEntity<>(orderService.deliveryOrder(orderId), HttpStatus.OK);
	}
	
	@PutMapping("/{orderId}/success")
	public ResponseEntity<OrderResponse> successOrder(@PathVariable Long orderId) throws CustomException {
		return new ResponseEntity<>(orderService.success(orderId), HttpStatus.OK);
	}
	
}
