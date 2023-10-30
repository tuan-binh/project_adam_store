package back_end.dto.request;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserLogin {
	private String email;
	private String password;
}
