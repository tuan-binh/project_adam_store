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
	
	// chức năng lấy tất cả thông tin phiếu giảm giá có trong hệ thống
	@Override
	public List<CouponResponse> findAll(String search) {
		// Khai báo danh sách chứa đối tượng CouponResponse
		List<CouponResponse> list;
		
		// Kiểm tra nếu tham số tìm kiếm trống
		if(search.isEmpty()) {
			// Nếu trống, lấy tất cả các Coupon từ repository và ánh xạ sang CouponResponse
			list = couponRepository.findAll().stream()
					  .map(item -> couponMapper.toResponse(item))
					  .collect(Collectors.toList());
		} else {
			// Nếu không trống, lấy danh sách các Coupon có tên chứa giá trị của tham số tìm kiếm (không phân biệt chữ hoa chữ thường)
			// và ánh xạ sang CouponResponse
			list = couponRepository.findAllByCouponContainingIgnoreCase(search).stream()
					  .map(item -> couponMapper.toResponse(item))
					  .collect(Collectors.toList());
		}
		
		// Trả về danh sách CouponResponse tùy thuộc vào giá trị của tham số tìm kiếm
		return list;
	}
	
	// chức năng lấy thông tin phiếu giảm giá theo id
	@Override
	public CouponResponse findById(Long id) throws CustomException {
		// Tìm kiếm Coupon theo ID. Nếu tìm thấy, ánh xạ sang CouponResponse
		// Nếu không tìm thấy, ném ngoại lệ tùy chỉnh thông báo rằng Coupon không được tìm thấy
		Optional<Coupon> optionalCoupon = couponRepository.findById(id);
		return optionalCoupon.map(item -> couponMapper.toResponse(item)).orElseThrow(()->new CustomException("coupon not found"));
	}
	
	// chức năng thêm thông tin phiếu giảm giá mới vào hệ thống
	@Override
	public CouponResponse save(CouponRequest couponRequest) throws CustomException {
		// Kiểm tra nếu đã tồn tại Coupon với tên tương ứng, ném ngoại lệ tùy chỉnh
		// Ngược lại, ánh xạ Coupon từ CouponRequest, lưu và ánh xạ kết quả sang CouponResponse
		if(couponRepository.existsByCoupon(couponRequest.getCoupon())) {
			throw new CustomException("coupon name is exists");
		}
		return couponMapper.toResponse(couponRepository.save(couponMapper.toEntity(couponRequest)));
	}
	
	// chức năng update thông tin phiếu giảm giá theo id
	@Override
	public CouponResponse update(CouponRequest couponRequest, Long id) throws CustomException {
		// Ánh xạ Coupon từ CouponRequest, đặt ID và kiểm tra tên Coupon cập nhật
		Coupon coupon = couponMapper.toEntity(couponRequest);
		coupon.setId(id);
		
		// Kiểm tra nếu tên giống với tên hiện có, cập nhật và trả về CouponResponse
		// Ngược lại, kiểm tra nếu đã tồn tại một Coupon với tên cập nhật, ném ngoại lệ tùy chỉnh
		// Ngược lại, cập nhật và trả về CouponResponse
		if(couponRequest.getCoupon().equals(couponRepository.findById(id).orElseThrow(()->new CustomException("coupon not found")).getCoupon())) {
			return couponMapper.toResponse(couponRepository.save(coupon));
		}
		if(couponRepository.existsByCoupon(coupon.getCoupon())) {
			throw new CustomException("coupon name is exists");
		}
		return couponMapper.toResponse(couponRepository.save(coupon));
	}
	
	// chức năng thay đổi trạng thái phiếu giảm giá ( true or false )
	@Override
	public CouponResponse changeStatusCoupon(Long id) throws CustomException {
		// Tìm kiếm Coupon theo ID. Nếu tìm thấy, thay đổi trạng thái và trả về CouponResponse đã cập nhật
		// Nếu không tìm thấy, ném ngoại lệ tùy chỉnh thông báo rằng Coupon không được tìm thấy
		Optional<Coupon> optionalCoupon = couponRepository.findById(id);
		if(optionalCoupon.isPresent()) {
			Coupon coupon = optionalCoupon.get();
			coupon.setStatus(!coupon.isStatus());
			return couponMapper.toResponse(couponRepository.save(coupon));
		}
		throw new CustomException("coupon not found");
	}
}
