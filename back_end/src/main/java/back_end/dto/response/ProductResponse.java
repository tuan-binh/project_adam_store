package back_end.dto.response;

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
public class ProductResponse {
	private Long id;
	private String productName;
	private String description;
	private String image;
	private int bought;
	private Category category;
	private List<ImageResponse> imageResponses;
	private List<ProductDetailResponse> productDetailResponses;
	private boolean status;
}
