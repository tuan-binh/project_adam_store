package back_end.service;

import back_end.model.RoleName;
import back_end.model.Roles;

public interface IRoleService {
	Roles findByRoleName(RoleName roleName);
}
