package back_end.dto.response;

import back_end.model.Color;
import back_end.model.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductDetailResponse {
	private Long id;
	private double price;
	private int stock;
	private Color color;
	private Size size;
	private boolean status;
}
