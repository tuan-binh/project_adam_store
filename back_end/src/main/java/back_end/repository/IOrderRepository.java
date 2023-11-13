package back_end.repository;

import back_end.model.OrderStatus;
import back_end.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Orders,Long> {
	Optional<Orders> findByUsersIdAndStatus(Long userId,boolean status);
	Page<Orders> findAllByUsersIdAndStatusAndOrderStatus(Long userId, boolean status, Pageable pageable, OrderStatus orderStatus);
	Page<Orders> findAllByUsersIdAndStatus(Long userId,boolean status,Pageable pageable);
	Page<Orders> findAllByStatus(boolean status,Pageable pageable);
	Page<Orders> findAllByStatusAndCustomerContainingIgnoreCase(boolean status,String customer,Pageable pageable);
	Page<Orders> findAllByStatusAndOrderStatus(boolean status,OrderStatus orderStatus,Pageable pageable);
	Page<Orders> findAllByStatusAndOrderStatusAndCustomerContainingIgnoreCase(boolean status,OrderStatus orderStatus,String customer,Pageable pageable);
	
	List<Orders> findAllByStatusAndOrderStatus(boolean status,OrderStatus orderStatus);
	List<Orders> findAllByStatus(boolean status);
	
}
