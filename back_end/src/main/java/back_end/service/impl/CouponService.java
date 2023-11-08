package back_end.service.impl;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.exception.CustomException;
import back_end.mapper.CouponMapper;
import back_end.model.Coupon;
import back_end.repository.ICouponRepository;
import back_end.service.ICouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CouponService implements ICouponService {
	
	@Autowired
	private ICouponRepository couponRepository;
	@Autowired
	private CouponMapper couponMapper;
	
	@Override
	public List<CouponResponse> findAll(Optional<String> search) {
		return search.map(s -> couponRepository.findAllByCouponContainingIgnoreCase(s).stream()
				  .map(item -> couponMapper.toResponse(item))
				  .collect(Collectors.toList())).orElseGet(() -> couponRepository.findAll().stream()
				  .map(item -> couponMapper.toResponse(item))
				  .collect(Collectors.toList()));
	}
	
	@Override
	public CouponResponse findById(Long id) throws CustomException {
		Optional<Coupon> optionalCoupon = couponRepository.findById(id);
		return optionalCoupon.map(item -> couponMapper.toResponse(item)).orElseThrow(()->new CustomException("coupon not found"));
	}
	
	@Override
	public CouponResponse save(CouponRequest couponRequest) throws CustomException {
		if(couponRepository.existsByCoupon(couponRequest.getCoupon())) {
			throw new CustomException("coupon name is exists");
		}
		return couponMapper.toResponse(couponRepository.save(couponMapper.toEntity(couponRequest)));
	}
	
	@Override
	public CouponResponse update(CouponRequest couponRequest, Long id) throws CustomException {
		Coupon coupon = couponMapper.toEntity(couponRequest);
		coupon.setId(id);
		if(couponRequest.getCoupon().equals(couponRepository.findById(id).orElseThrow(()->new CustomException("coupon not found")).getCoupon())) {
			return couponMapper.toResponse(couponRepository.save(coupon));
		}
		if(couponRepository.existsByCoupon(coupon.getCoupon())) {
			throw new CustomException("coupon name is exists");
		}
		return couponMapper.toResponse(couponRepository.save(coupon));
	}
	
	@Override
	public CouponResponse changeStatusCoupon(Long id) throws CustomException {
		Optional<Coupon> optionalCoupon = couponRepository.findById(id);
		if(optionalCoupon.isPresent()) {
			Coupon coupon = optionalCoupon.get();
			coupon.setStatus(!coupon.isStatus());
			return couponMapper.toResponse(couponRepository.save(coupon));
		}
		throw new CustomException("coupon not found");
	}
}
