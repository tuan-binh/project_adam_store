package back_end.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "color")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Color {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String colorName;
	
	private boolean status;
	
}
