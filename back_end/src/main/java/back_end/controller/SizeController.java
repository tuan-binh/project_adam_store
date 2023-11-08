package back_end.controller;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.exception.CustomException;
import back_end.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/size")
@CrossOrigin("*")
public class SizeController {

	@Autowired
	private ISizeService sizeService;
	
	// chức năng lấy tất cả thông tin size có trong hệ thống
	@GetMapping
	public ResponseEntity<List<SizeResponse>> getAllSize(@RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(sizeService.findAll(search), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin size theo id
	@GetMapping("/{sizeId}")
	public ResponseEntity<SizeResponse> getSizeById(@PathVariable Long sizeId) throws CustomException {
		return new ResponseEntity<>(sizeService.findById(sizeId),HttpStatus.OK);
	}
	
	// chức năng thêm thông tin size mới vào hệ thống
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<SizeResponse> addNewSize(@RequestBody SizeRequest sizeRequest) throws CustomException {
		return new ResponseEntity<>(sizeService.save(sizeRequest),HttpStatus.CREATED);
	}
	
	// chức năng update thông tin sản phẩm vào hệ thống
	@PutMapping("/{sizeId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<SizeResponse> updateSize(@RequestBody SizeRequest sizeRequest,@PathVariable Long sizeId) throws CustomException {
		return new ResponseEntity<>(sizeService.update(sizeRequest,sizeId),HttpStatus.OK);
	}
	
	// chức năng thay đổi trạng thái của size đó theo id ( true or false )
	// nếu nó là true thì sẽ hiển thị và thêm nó vào sản phẩm chi tiết
	//  nếu nó là false thì sẽ không hiển thị khi thêm vài sản phẩm chi tiết
	@PutMapping("/{sizeId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<SizeResponse> changeStatusSize(@PathVariable Long sizeId) throws CustomException {
		return new ResponseEntity<>(sizeService.changeStatusSize(sizeId),HttpStatus.OK);
	}

}
