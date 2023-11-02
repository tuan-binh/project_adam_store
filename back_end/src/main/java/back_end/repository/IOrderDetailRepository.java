package back_end.repository;

import back_end.model.OrderDetail;
import org.hibernate.criterion.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail, Long> {
	
	List<OrderDetail> findAllByOrdersId(Long orderId);
	
	Optional<OrderDetail> findByProductDetailIdAndOrdersId(Long productDetailId, Long orderId);
	
	void deleteAllByOrdersId(Long orderId);
}
