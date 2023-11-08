package back_end.service;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.exception.CustomException;

import java.util.List;
import java.util.Optional;

public interface ICouponService {
	
	List<CouponResponse> findAll(String search);
	CouponResponse findById(Long id) throws CustomException;
	CouponResponse save(CouponRequest couponRequest) throws CustomException;
	CouponResponse update(CouponRequest couponRequest,Long id) throws CustomException;
	CouponResponse changeStatusCoupon(Long id) throws CustomException;
	
}
