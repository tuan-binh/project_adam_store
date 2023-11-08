package back_end.controller;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.exception.CustomException;
import back_end.service.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// lấy http://localhost:8080 sẽ lấy phần trong RequestParam
@RestController
@RequestMapping("/api/color")
@CrossOrigin("*")
public class ColorController {
	
	@Autowired
	private IColorService colorService;
	
	// chức năng lấy tất cả thông tin màu có trong hệ thống
	@GetMapping
	public ResponseEntity<List<ColorResponse>> getAllColor(@RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(colorService.findAll(search), HttpStatus.OK);
	}
	
	// chức năng lấy thông tin màu theo id
	@GetMapping("/{colorId}")
	public ResponseEntity<ColorResponse> getColorById(@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.findById(colorId),HttpStatus.OK);
	}
	
	// chức năng thêm thông tin màu mới vào hệ thống
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ColorResponse> addNewColor(@RequestBody ColorRequest colorRequest) throws CustomException {
		return new ResponseEntity<>(colorService.save(colorRequest),HttpStatus.CREATED);
	}
	
	// chức năng update thông tin màu theo id
	@PutMapping("/{colorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ColorResponse> updateColor(@RequestBody ColorRequest colorRequest,@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.update(colorRequest,colorId),HttpStatus.OK);
	}
	
	// chức năng thay đổi trạng thái của màu (true or false)
	// nếu nó là true thì sẽ là shop còn bán những sản phẩm thuộc màu đó đó
	// nếu nó là false thì sẽ không cho tạo sản phẩm thuộc màu đó nữa
	@PutMapping("/{colorId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')") // chỉ tài khoản admin mới được dùng API này
	public ResponseEntity<ColorResponse> changeStatusColor(@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.changeStatusColor(colorId),HttpStatus.OK);
	}
	
}
