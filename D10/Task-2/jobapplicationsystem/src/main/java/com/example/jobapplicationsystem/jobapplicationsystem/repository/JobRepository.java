package com.example.jobapplicationsystem.jobapplicationsystem.repository;

import com.example.jobapplicationsystem.jobapplicationsystem.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {}
