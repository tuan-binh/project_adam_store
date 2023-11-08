package back_end.repository;

import back_end.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICouponRepository extends JpaRepository<Coupon,Long> {
	
	boolean existsByCoupon(String coupon);
	
	List<Coupon> findAllByCouponContainingIgnoreCase(String coupon);

}
