package com.example.jobapplicationsystem.jobapplicationsystem.controller;

import com.example.jobapplicationsystem.jobapplicationsystem.dto.ApplicationRequest;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Application;
import com.example.jobapplicationsystem.jobapplicationsystem.entity.Job;
import com.example.jobapplicationsystem.jobapplicationsystem.service.JobApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService service;

    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        return new ResponseEntity<>(service.createJob(job), HttpStatus.CREATED);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(service.getAllJobs());
    }

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(service.getAllApplications());
    }

    @PostMapping("/applications/apply")
    public ResponseEntity<Application> applyForJob(@RequestBody ApplicationRequest request) {
        return new ResponseEntity<>(service.applyForJob(request), HttpStatus.CREATED);
    }

    // Simple localized exception handler for clean error responses (e.g., duplicate application)
    @ExceptionHandler({RuntimeException.class, IllegalStateException.class})
    public ResponseEntity<Map<String, String>> handleErrors(Exception ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
    }
}
