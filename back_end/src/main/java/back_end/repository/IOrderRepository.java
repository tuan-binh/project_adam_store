package back_end.repository;

import back_end.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<Orders,Long> {
	Optional<Orders> findByUsersIdAndStatus(Long userId,boolean status);
}
