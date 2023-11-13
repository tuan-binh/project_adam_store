package back_end.controller;

import back_end.dto.response.UserResponse;
import back_end.exception.CustomException;
import back_end.service.IUserAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class UserAdminController {

	@Autowired
	private IUserAdminService userAdminService;
	
	@GetMapping("/users")
	public ResponseEntity<Page<UserResponse>> getAllUserByAdmin(@PageableDefault(page = 0,size = 2,sort = "id",direction = Sort.Direction.ASC)Pageable pageable,
																					@RequestParam(defaultValue = "") String search) {
		return new ResponseEntity<>(userAdminService.getAllUserByAdmin(pageable,search), HttpStatus.OK);
	}
	
	@PutMapping("/user/{idUser}/status")
	public ResponseEntity<UserResponse> changeStatusUser(@PathVariable Long idUser) throws CustomException {
		return new ResponseEntity<>(userAdminService.changeStatusUser(idUser),HttpStatus.OK);
	}

}
