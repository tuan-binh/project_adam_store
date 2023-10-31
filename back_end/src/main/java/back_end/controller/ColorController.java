package back_end.controller;

import back_end.dto.request.ColorRequest;
import back_end.dto.response.ColorResponse;
import back_end.exception.CustomException;
import back_end.service.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/color")
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
	public ResponseEntity<ColorResponse> addNewColor(@RequestBody ColorRequest colorRequest) {
		return new ResponseEntity<>(colorService.save(colorRequest),HttpStatus.CREATED);
	}
	
	@PutMapping("/{colorId}")
	public ResponseEntity<ColorResponse> updateColor(@RequestBody ColorRequest colorRequest,@PathVariable Long colorId) {
		return new ResponseEntity<>(colorService.update(colorRequest,colorId),HttpStatus.OK);
	}
	
	@PutMapping("/{colorId}/status")
	public ResponseEntity<ColorResponse> changeStatusColor(@PathVariable Long colorId) throws CustomException {
		return new ResponseEntity<>(colorService.changeStatusColor(colorId),HttpStatus.OK);
	}
	
}
