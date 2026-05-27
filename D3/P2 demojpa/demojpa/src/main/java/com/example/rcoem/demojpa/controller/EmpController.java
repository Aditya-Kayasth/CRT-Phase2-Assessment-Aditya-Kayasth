package com.example.rcoem.demojpa.controller;

import java.util.List;

import com.example.rcoem.demojpa.model.Employee;
import com.example.rcoem.demojpa.services.EmployeeServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
public class EmpController {

    @Autowired
    private EmployeeServices service;

    @PostMapping("/add")
    public Employee add(@RequestBody Employee obj) {
        return service.save(obj);
    }

    @GetMapping("/all")
    public List<Employee> getAll() {
        return service.getAll();
    }

    @GetMapping("/find/{id}")
    public Employee getById(@PathVariable int id) {
        return service.getById(id);
    }

    @PutMapping("/update")
    public Employee update(@RequestBody Employee obj) {
        return service.update(obj);
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        return service.delete(id);
    }
}