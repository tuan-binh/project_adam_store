package back_end.mapper;

import back_end.dto.response.UserResponse;
import back_end.model.Users;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class UserMapper {
	
	public UserResponse toUserResponse(Users users) {
		return UserResponse.builder()
				  .id(users.getId())
				  .fullName(users.getFullName())
				  .email(users.getEmail())
				  .phone(users.getPhone())
				  .address(users.getAddress())
				  .roles(users.getRoles().stream().map(item -> item.getRoleName().name()).collect(Collectors.toList()))
				  .status(users.isStatus())
				  .build();
	}
	
}
