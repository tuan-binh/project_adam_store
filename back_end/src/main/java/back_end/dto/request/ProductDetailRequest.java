package back_end.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductDetailRequest {
	private double price;
	private int stock;
	private Long colorId;
	private Long sizeId;
	private boolean status;
}
