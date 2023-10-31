package back_end.repository;

import back_end.model.OrderDetail;
import org.hibernate.criterion.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderDetailRepository extends JpaRepository<OrderDetail,Long> {
	
	List<OrderDetail> findAllByOrdersId(Long orderId);
}
