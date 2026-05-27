package com.example.jobapplicationsystem.jobapplicationsystem.repository;

import com.example.jobapplicationsystem.jobapplicationsystem.entity.Application;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Job;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    // Derived query for the Bonus requirement: checks if mapping already exists
    boolean existsByStudentAndJob(Student student, Job job);
}
