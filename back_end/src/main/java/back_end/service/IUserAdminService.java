package back_end.service;

import back_end.dto.response.UserResponse;
import back_end.exception.CustomException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IUserAdminService {
	
	Page<UserResponse> getAllUserByAdmin(Pageable pageable,String search);
	
	UserResponse changeStatusUser(Long id) throws CustomException;
	
}
