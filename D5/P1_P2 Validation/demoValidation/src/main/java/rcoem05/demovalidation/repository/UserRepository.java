package rcoem05.demovalidation.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rcoem05.demovalidation.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring automatically translates this into: SELECT * FROM users WHERE username = ?
    Optional<User> findByUsername(String username);
}