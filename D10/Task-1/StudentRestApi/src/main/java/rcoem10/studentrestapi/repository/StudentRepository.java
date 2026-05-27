package rcoem10.studentrestapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rcoem10.studentrestapi.entity.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    // Bonus Requirement
    List<Student> findByBranch(String branch);
}