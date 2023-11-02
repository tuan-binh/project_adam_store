package back_end.service.impl;

import back_end.dto.request.RatingRequest;
import back_end.exception.CustomException;
import back_end.model.Orders;
import back_end.model.Rating;
import back_end.repository.IOrderRepository;
import back_end.repository.IRatingRepository;
import back_end.security.user_principal.UserPrinciple;
import back_end.service.IRatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
public class RatingService implements IRatingService {
	
	@Autowired
	private IRatingRepository ratingRepository;
	@Autowired
	private IOrderRepository orderRepository;
	
	@Override
	public String ratingOrder(Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			Rating rating = ratingRepository.save(Rating.builder().rate(ratingRequest.getRate()).content(ratingRequest.getContent()).created(new Date()).build());
			orders.setRating(rating);
			orderRepository.save(orders);
			return "Success";
		}
		throw new CustomException("you don't have this order");
	}
	
	@Override
	public String updateRatingOrder(Long ratingId, Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			Rating rating = ratingRepository.findById(ratingId).orElseThrow(() -> new CustomException("rating not found"));
			rating.setRate(ratingRequest.getRate());
			rating.setContent(ratingRequest.getContent());
			rating.setCreated(new Date());
			ratingRepository.save(rating);
			return "Success";
		}
		throw new CustomException("you don't have this order");
	}
}
