package back_end.repository;

import back_end.model.ImageProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageProductRepository extends JpaRepository<ImageProduct, Long> {
	List<ImageProduct> findAllByProductId(Long productId);
}
