package back_end.controller;

import back_end.dto.request.RatingRequest;
import back_end.exception.CustomException;
import back_end.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/rating")
@CrossOrigin("*")
public class RatingController {
	
	@Autowired
	private IRatingService ratingService;
	
	@PostMapping("/{orderId}")
	public ResponseEntity<String> ratingOrder(@PathVariable Long orderId, @RequestBody RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(ratingService.ratingOrder(orderId, ratingRequest, authentication), HttpStatus.CREATED);
	}
	
	@PutMapping("/{ratingId}/in/{orderId}")
	public ResponseEntity<String> updateRatingOrder(@PathVariable Long ratingId, @PathVariable Long orderId, @RequestBody RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(ratingService.updateRatingOrder(ratingId, orderId, ratingRequest, authentication), HttpStatus.OK);
	}
	
}
