package back_end.repository;

import back_end.model.OrderStatus;
import back_end.model.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

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
	
	@Query("SELECT SUM(o.total) FROM Orders o WHERE YEAR(o.time) = :year AND MONTH(o.time) = :month AND o.orderStatus = :status ")
	Double findByTimeGVCTotal(@Param("year") int year,@Param("month") int month,@Param("status") OrderStatus orderStatus);
	
	@Query("SELECT COUNT(o.id) FROM Orders o WHERE YEAR(o.time) = :year AND MONTH(o.time) = :month AND o.orderStatus = :status ")
	Integer getCountOrderByOrderStatus(@Param("year") int year,@Param("month") int month,@Param("status") OrderStatus orderStatus);
	
}
