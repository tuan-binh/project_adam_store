package back_end.dto.response;

import back_end.model.Coupon;
import back_end.model.OrderStatus;
import back_end.model.Rating;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class OrderResponse {
	private Long id;
	private OrderStatus orderStatus;
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
	private Date time;
	private String address;
	private String customer;
	private String phone;
	private double total;
	private Coupon coupon;
	private Rating rating;
	private boolean status;
}
