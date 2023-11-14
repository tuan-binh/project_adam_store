package back_end.service.impl;

import back_end.dto.response.UserResponse;
import back_end.exception.CustomException;
import back_end.mapper.UserMapper;
import back_end.model.RoleName;
import back_end.model.Users;
import back_end.repository.IUserRepository;
import back_end.service.IRoleService;
import back_end.service.IUserAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class UserAdminService implements IUserAdminService {
	
	@Autowired
	private IUserRepository userRepository;
	@Autowired
	private IRoleService roleService;
	@Autowired
	private UserMapper userMapper;
	
	@Override
	public Page<UserResponse> getAllUserByAdmin(Pageable pageable, String search) {
		Page<Users> list;
		if(search.isEmpty()) {
			list = userRepository.findAll(pageable);
		} else {
			list =  userRepository.findAllByFullNameContainingIgnoreCase(search,pageable);
		}
		
		return list.map(item -> userMapper.toUserResponse(item));
	}
	
	@Override
	public UserResponse changeStatusUser(Long id) throws CustomException {
		Users users = userRepository.findById(id).orElseThrow(()->new CustomException("user not found"));
		users.setStatus(!users.isStatus());
		return userMapper.toUserResponse(userRepository.save(users));
	}
}
