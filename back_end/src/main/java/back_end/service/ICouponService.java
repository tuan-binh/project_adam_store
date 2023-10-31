package back_end.service;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.exception.CustomException;

import java.util.List;

public interface ICouponService {
	
	List<CouponResponse> findAll();
	CouponResponse findById(Long id) throws CustomException;
	CouponResponse save(CouponRequest couponRequest);
	CouponResponse update(CouponRequest couponRequest,Long id);
	CouponResponse changeStatusCoupon(Long id) throws CustomException;
	
}
