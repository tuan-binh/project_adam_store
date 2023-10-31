package back_end.security.user_principal;

import back_end.model.Users;
import back_end.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailService implements UserDetailsService {
	
	@Autowired
	private IUserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Users users = findByEmail(username);
		return UserPrinciple.build(users);
	}
	
	public Users findByEmail(String email) {
		Optional<Users> optionalUsers = userRepository.findByEmail(email);
		return optionalUsers.orElseThrow(() -> new RuntimeException("email not found"));
	}
	
}
