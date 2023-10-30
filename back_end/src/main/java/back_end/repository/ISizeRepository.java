package back_end.repository;

import back_end.model.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISizeRepository extends JpaRepository<Size,Long> {
	boolean existsBySizeName(String sizeName);
}
