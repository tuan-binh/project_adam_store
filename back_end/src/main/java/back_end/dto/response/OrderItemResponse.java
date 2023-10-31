package back_end.dto.response;

import back_end.model.Product;
import back_end.model.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderItemResponse {
	private Long id;
	private ProductDetail productDetail;
	private double price;
	private int quantity;
}
