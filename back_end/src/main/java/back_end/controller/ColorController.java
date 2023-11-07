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

@RestController
@RequestMapping("/api/color")
@CrossOrigin("*")
public class ColorController {
	
	@Autowired
	private IColorService colorService;
	
	@GetMapping
	public ResponseEntity<List<ColorResponse>> getAllColor() {
		return new ResponseEntity<>(colorService.findAll(), HttpStatus.OK);
	}
	
	@GetMapping("/{colorId}")
	public ResponseEntity<ColorResponse> getColorById(@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.findById(colorId),HttpStatus.OK);
	}
	
	@PostMapping
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<ColorResponse> addNewColor(@RequestBody ColorRequest colorRequest) {
		return new ResponseEntity<>(colorService.save(colorRequest),HttpStatus.CREATED);
	}
	
	@PutMapping("/{colorId}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<ColorResponse> updateColor(@RequestBody ColorRequest colorRequest,@PathVariable Long colorId) {
		return new ResponseEntity<>(colorService.update(colorRequest,colorId),HttpStatus.OK);
	}
	
	@PutMapping("/{colorId}/status")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<ColorResponse> changeStatusColor(@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.changeStatusColor(colorId),HttpStatus.OK);
	}
	
}
