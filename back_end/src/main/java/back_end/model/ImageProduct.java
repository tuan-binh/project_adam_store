package back_end.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "image_product")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ImageProduct {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String url;
	
	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

}
