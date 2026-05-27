package com.example.jobapplicationsystem.jobapplicationsystem.repository;

import com.example.jobapplicationsystem.jobapplicationsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {}
