package back_end.repository;

import back_end.model.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IColorRepository extends JpaRepository<Color,Long> {
	
	boolean existsByColorNameIgnoreCase(String colorName);
	List<Color> findAllByColorNameContainingIgnoreCase(String colorName);
}
