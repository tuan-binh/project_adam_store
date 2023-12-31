package back_end.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserResponse {
	private Long id;
	private String fullName;
	private String email;
	private String phone;
	private String address;
	private List<String> roles;
	private boolean status;
}
