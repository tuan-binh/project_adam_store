package back_end.service;

import back_end.dto.request.RatingRequest;
import back_end.exception.CustomException;
import org.springframework.security.core.Authentication;

public interface IRatingService {
	
	String ratingOrder(Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException;
	
	String updateRatingOrder(Long ratingId, Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException;
	
}
