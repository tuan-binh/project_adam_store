package back_end.dto.request;

import back_end.model.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductRequest {
	private String productName;
	private String description;
	private List<String> images;
	private Long categoryId;
	private boolean status;
}
