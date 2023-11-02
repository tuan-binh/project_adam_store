package back_end.controller;

import back_end.exception.CustomException;
import back_end.service.IFavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favourite")
@CrossOrigin("*")
public class FavouriteController {
	
	@Autowired
	private IFavouriteService favouriteService;
	
	@PostMapping("/{productId}")
	public ResponseEntity<String> addProductToFavourite(@PathVariable Long productId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(favouriteService.addProductToFavourite(productId, authentication), HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{productId}")
	public ResponseEntity<String> removeProductInFavourite(@PathVariable Long productId, Authentication authentication) throws CustomException {
		return new ResponseEntity<>(favouriteService.removeProductInFavourite(productId, authentication), HttpStatus.OK);
	}
	
}
