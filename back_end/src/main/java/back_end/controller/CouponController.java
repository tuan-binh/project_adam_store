package back_end.controller;

import back_end.dto.request.CouponRequest;
import back_end.dto.response.CouponResponse;
import back_end.exception.CustomException;
import back_end.service.ICouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/coupon")
@CrossOrigin("*")
public class CouponController {
	
	@Autowired
	private ICouponService couponService;
	
	// chức năng lấy tất cả thông tin phiếu giảm giá có trong hệ thống
	@GetMapping
	public ResponseEntity<List<CouponResponse>> getAllCoupon(@RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(couponService.findAll(search), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin phiếu giảm giá theo id
	@GetMapping("/{couponId}")
	public ResponseEntity<CouponResponse> getCouponById(@PathVariable Long couponId) throws CustomException {
		return new ResponseEntity<>(couponService.findById(couponId), HttpStatus.OK);
	}
	
	// chức năng thêm thông tin phiếu giảm giá mới vào hệ thống
	@PostMapping
	public ResponseEntity<CouponResponse> addNewCoupon(@RequestBody CouponRequest couponRequest) throws CustomException {
		return new ResponseEntity<>(couponService.save(couponRequest), HttpStatus.CREATED);
	}
	
	// chức năng update thông tin phiếu giảm giá theo id
	@PutMapping("/{couponId}")
	public ResponseEntity<CouponResponse> updateCoupon(@RequestBody CouponRequest couponRequest, @PathVariable Long couponId) throws CustomException {
		return new ResponseEntity<>(couponService.update(couponRequest, couponId), HttpStatus.OK);
	}
	
	// chức năng thay đổi trạng thái phiếu giảm giá ( true or false )
	// nếu nó là true thì sẽ sử dụng được và có thể áp mã giảm giá đó
	// nếu nó là false thì sẽ ẩn nó đi người dùng sẽ không thấy là ko thể áp mã giảm giá được
	@PutMapping("/{couponId}/status")
	public ResponseEntity<CouponResponse> changeStatus(@PathVariable Long couponId) throws CustomException {
		return new ResponseEntity<>(couponService.changeStatusCoupon(couponId), HttpStatus.OK);
	}
	
}
