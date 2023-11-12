package back_end.controller;

import back_end.dto.request.CheckoutRequest;
import back_end.dto.response.OrderItemResponse;
import back_end.dto.response.OrderResponse;
import back_end.exception.CustomException;
import back_end.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
	
	@Autowired
	private IOrderService orderService;
	
	@GetMapping("/admin")
	public ResponseEntity<Page<OrderResponse>> getAllOrderByAdmin(@PageableDefault(page = 0, size = 2, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
																					  @RequestParam(defaultValue = "ALL") String orderStatus,
																					  @RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(orderService.getAllOrderByAdmin(pageable, orderStatus, search), HttpStatus.OK);
	}
	
	// chức năng check out giỏ hàng của nguười dùng đang nhập
	@PutMapping("/checkout")
	public ResponseEntity<OrderResponse> checkoutOrder(@RequestBody CheckoutRequest checkoutRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(orderService.checkoutCart(checkoutRequest, authentication), HttpStatus.OK);
	}
	
	// chức năng lấy ra những sản phẩm có trong order ( hóa đơn ) một danh sách sản phẩm trong hóa đơn
	@GetMapping("/{orderId}")
	public ResponseEntity<List<OrderItemResponse>> getAllOrderItemByOrderId(@PathVariable Long orderId) throws CustomException {
		return new ResponseEntity<>(orderService.getOrderItemByOrderId(orderId), HttpStatus.OK);
	}
	
	// chức năng hủy đơn hàng đó chuyển nó về trạng thái CANCEL
	@PutMapping("/{orderId}/cancel")
	public ResponseEntity<OrderResponse> cancelOrder(@PathVariable Long orderId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(orderService.cancelOrder(orderId, authentication), HttpStatus.OK);
	}
	
	// chức năng chuyển trạng thái giao hàng ( chuyển trạng thái đơn hàng sang trạng thái giao hàng )
	@PutMapping("/{orderId}/delivery")
	public ResponseEntity<OrderResponse> deliveryOrder(@PathVariable Long orderId) throws CustomException {
		return new ResponseEntity<>(orderService.deliveryOrder(orderId), HttpStatus.OK);
	}
	
	// chức năng chuyển trạng thái thành công ( chuyển trạng thái đơn hàng sang SUCCESS thành công cũng như giao hàng thành công )
	@PutMapping("/{orderId}/success")
	public ResponseEntity<OrderResponse> successOrder(@PathVariable Long orderId) throws CustomException {
		return new ResponseEntity<>(orderService.success(orderId), HttpStatus.OK);
	}
	
}
