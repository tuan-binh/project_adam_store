package back_end.mapper;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.model.Coupon;
import org.springframework.stereotype.Component;

@Component
public class CouponMapper implements IGenericMapper<Coupon, CouponRequest, CouponResponse> {
	@Override
	public Coupon toEntity(CouponRequest couponRequest) {
		return Coupon.builder()
				  .coupon(couponRequest.getCoupon().toUpperCase())
				  .percent(couponRequest.getPercent() / 100)
				  .startDate(couponRequest.getStartDate())
				  .endDate(couponRequest.getEndDate())
				  .stock(couponRequest.getStock())
				  .status(couponRequest.isStatus())
				  .build();
	}
	
	@Override
	public CouponResponse toResponse(Coupon coupon) {
		return CouponResponse.builder()
				  .id(coupon.getId())
				  .coupon(coupon.getCoupon())
				  .percent(coupon.getPercent() * 100)
				  .startDate(coupon.getStartDate())
				  .endDate(coupon.getEndDate())
				  .stock(coupon.getStock())
				  .status(coupon.isStatus())
				  .build();
	}
}
