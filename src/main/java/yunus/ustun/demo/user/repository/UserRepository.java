package yunus.ustun.demo.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yunus.ustun.demo.user.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
