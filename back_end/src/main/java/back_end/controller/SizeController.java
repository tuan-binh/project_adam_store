package back_end.controller;

import back_end.dto.request.SizeRequest;
import back_end.dto.response.SizeResponse;
import back_end.exception.CustomException;
import back_end.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/size")
public class SizeController {

	@Autowired
	private ISizeService sizeService;
	
	@GetMapping
	public ResponseEntity<List<SizeResponse>> getAllSize() {
		return new ResponseEntity<>(sizeService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{sizeId}")
	public ResponseEntity<SizeResponse> getSizeById(@PathVariable Long sizeId) throws CustomException {
		return new ResponseEntity<>(sizeService.findById(sizeId),HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<SizeResponse> addNewSize(@RequestBody SizeRequest sizeRequest) {
		return new ResponseEntity<>(sizeService.save(sizeRequest),HttpStatus.CREATED);
	}
	
	@PutMapping("/{sizeId}")
	public ResponseEntity<SizeResponse> updateSize(@RequestBody SizeRequest sizeRequest,@PathVariable Long sizeId) {
		return new ResponseEntity<>(sizeService.update(sizeRequest,sizeId),HttpStatus.OK);
	}
	
	@PutMapping("/{sizeId}/status")
	public ResponseEntity<SizeResponse> changeStatusSize(@PathVariable Long sizeId) throws CustomException {
		return new ResponseEntity<>(sizeService.changeStatusSize(sizeId),HttpStatus.OK);
	}

}
