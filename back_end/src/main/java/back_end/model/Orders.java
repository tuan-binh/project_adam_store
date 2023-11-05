package back_end.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Orders {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy")
	private Date time;
	
	private String address;
	
	private String customer;
	
	private String phone;
	
	private double total;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users users;
	
	@OneToOne
	@JoinColumn(name = "coupon_id")
	private Coupon coupon;
	
	@OneToOne
	@JoinColumn(name = "rating_id")
	private Rating rating;
	
	private boolean status;

}
