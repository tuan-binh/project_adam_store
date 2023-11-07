package back_end.repository;

import back_end.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryRepository extends JpaRepository<Category,Long> {
	
	boolean existsByCategoryName(String categoryName);
	
	List<Category> findAllByCategoryNameContainingIgnoreCase(String categoryName);
	
}
