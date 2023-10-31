package back_end.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductUpdateRequest {
	private String productName;
	private String description;
	private Long categoryId;
	private boolean status;
}
