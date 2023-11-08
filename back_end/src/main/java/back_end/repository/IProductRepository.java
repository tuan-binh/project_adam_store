package back_end.repository;

import back_end.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends JpaRepository<Product,Long> {
	
	Page<Product> findAllByProductNameContainingIgnoreCaseAndCategoryCategoryName(String productName, String categoryName, Pageable pageable);
	
	Page<Product> findAllByProductNameContainingIgnoreCase(String productName,Pageable pageable);
	
	Page<Product> findAllByCategoryCategoryName(String categoryName,Pageable pageable);

}
