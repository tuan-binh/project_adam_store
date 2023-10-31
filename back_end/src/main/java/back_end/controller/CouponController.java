package back_end.controller;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.exception.CustomException;
import back_end.service.ICouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coupon")
@CrossOrigin("*")
public class CouponController {

	@Autowired
	private ICouponService couponService;
	
	@GetMapping
	public ResponseEntity<List<CouponResponse>> getAllCoupon() {
		return new ResponseEntity<>(couponService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{couponId}")
	public ResponseEntity<CouponResponse> getCouponById(@PathVariable Long couponId) throws CustomException {
		return new ResponseEntity<>(couponService.findById(couponId),HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<CouponResponse> addNewCoupon(@RequestBody CouponRequest couponRequest) {
		return new ResponseEntity<>(couponService.save(couponRequest),HttpStatus.CREATED);
	}
	
	@PutMapping("/{couponId}")
	public ResponseEntity<CouponResponse> updateCoupon(@RequestBody CouponRequest couponRequest,@PathVariable Long couponId) {
		return new ResponseEntity<>(couponService.update(couponRequest,couponId),HttpStatus.OK);
	}
	
	@PutMapping("/{couponId}/status")
	public ResponseEntity<CouponResponse> changeStatus(@PathVariable Long couponId) throws CustomException {
		return new ResponseEntity<>(couponService.changeStatusCoupon(couponId),HttpStatus.OK);
	}

}
