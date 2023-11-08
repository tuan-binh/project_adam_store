package back_end.controller;

import back_end.dto.request.RatingRequest;
import back_end.exception.CustomException;
import back_end.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/rating")
@CrossOrigin("*")
public class RatingController {
	
	@Autowired
	private IRatingService ratingService;
	
	// chức năng đánh giá chất lượng dịnh vụ sau khi giao hàng thàn công của order
	@PostMapping("/{orderId}")
	public ResponseEntity<String> ratingOrder(@PathVariable Long orderId, @RequestBody RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(ratingService.ratingOrder(orderId, ratingRequest, authentication), HttpStatus.CREATED);
	}
	
	// chức năng sửa đánh giá định vụ ( sẽ chỉ sửa trong ngày sẽ sử lý ở front end )
	@PutMapping("/{ratingId}/in/{orderId}")
	public ResponseEntity<String> updateRatingOrder(@PathVariable Long ratingId, @PathVariable Long orderId, @RequestBody RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(ratingService.updateRatingOrder(ratingId, orderId, ratingRequest, authentication), HttpStatus.OK);
	}
	
}
