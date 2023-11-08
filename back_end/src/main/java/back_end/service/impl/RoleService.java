package back_end.service.impl;

import back_end.model.RoleName;
import back_end.model.Roles;
import back_end.repository.IRoleRepository;
import back_end.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService {
	
	@Autowired
	private IRoleRepository roleRepository;
	
	@Override
	public Roles findByRoleName(RoleName roleName) {
		// tìm kiếm role theo roleName kiểu dữ liệu Enum
		Optional<Roles> optionalRoles = roleRepository.findByRoleName(roleName);
		return optionalRoles.orElseThrow(() -> new RuntimeException("role not found"));
	}
}
