package rcoem10.studentrestapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import rcoem10.studentrestapi.entity.Student;
import rcoem10.studentrestapi.repository.StudentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository repository;

    public Student createStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    public void deleteStudent(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Student not found with ID: " + id);
        }
        repository.deleteById(id);
    }

    // Bonus
    public List<Student> getStudentsByBranch(String branch) {
        return repository.findByBranch(branch);
    }
}