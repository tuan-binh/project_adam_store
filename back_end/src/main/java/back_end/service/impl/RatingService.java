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
	
	// chức năng đánh giá chất lượng dịnh vụ sau khi giao hàng thàn công của order
	@Override
	public String ratingOrder(Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException {// Lấy thông tin người dùng hiện tại từ Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm đơn hàng theo ID hoặc ném CustomException nếu không tìm thấy
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem người đánh giá có quyền đánh giá đơn hàng này hay không
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			// Lưu đánh giá mới vào cơ sở dữ liệu và gán đánh giá cho đơn hàng
			Rating rating = ratingRepository.save(Rating.builder().rate(ratingRequest.getRate()).content(ratingRequest.getContent()).created(new Date()).build());
			orders.setRating(rating);
			orderRepository.save(orders);
			return "Success";
		}
		
		// Nếu không có quyền đánh giá đơn hàng, ném CustomException
		throw new CustomException("you don't have this order");
	}
	
	// chức năng sửa đánh giá định vụ ( sẽ chỉ sửa trong ngày sẽ sử lý ở front end )
	@Override
	public String updateRatingOrder(Long ratingId, Long orderId, RatingRequest ratingRequest, Authentication authentication) throws CustomException {
		// Lấy thông tin người dùng hiện tại từ Authentication
		UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
		
		// Tìm kiếm đơn hàng theo ID hoặc ném CustomException nếu không tìm thấy
		Orders orders = orderRepository.findById(orderId).orElseThrow(() -> new CustomException("order not found"));
		
		// Kiểm tra xem người đánh giá có quyền cập nhật đánh giá đơn hàng này hay không
		if (Objects.equals(orders.getUsers().getId(), userPrinciple.getId())) {
			// Tìm kiếm đánh giá theo ID hoặc ném CustomException nếu không tìm thấy
			Rating rating = ratingRepository.findById(ratingId).orElseThrow(() -> new CustomException("rating not found"));
			
			// Cập nhật thông tin đánh giá và lưu vào cơ sở dữ liệu
			rating.setRate(ratingRequest.getRate());
			rating.setContent(ratingRequest.getContent());
			rating.setCreated(new Date());
			ratingRepository.save(rating);
			return "Success";
		}
		
		// Nếu không có quyền cập nhật đánh giá đơn hàng, ném CustomException
		throw new CustomException("you don't have this order");
	}
}
