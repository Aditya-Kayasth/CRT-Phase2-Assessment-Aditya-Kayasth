package com.example.jobapplicationsystem.jobapplicationsystem.service;

import com.example.jobapplicationsystem.jobapplicationsystem.dto.ApplicationRequest;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Application;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Job;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Student;
import com.example.jobapplicationsystem.jobapplicationsystem.repository.ApplicationRepository;
import com.example.jobapplicationsystem.jobapplicationsystem.repository.JobRepository;
import com.example.jobapplicationsystem.jobapplicationsystem.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final StudentRepository studentRepository;

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application applyForJob(ApplicationRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + request.getStudentId()));

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(() -> new RuntimeException("Job not found with ID: " + request.getJobId()));

        // Bonus: Prevent duplicate applications
        if (applicationRepository.existsByStudentAndJob(student, job)) {
            throw new IllegalStateException("Student has already applied for this job.");
        }

        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setApplicationDate(LocalDate.now());
        application.setStatus("APPLIED");

        return applicationRepository.save(application);
    }
}
