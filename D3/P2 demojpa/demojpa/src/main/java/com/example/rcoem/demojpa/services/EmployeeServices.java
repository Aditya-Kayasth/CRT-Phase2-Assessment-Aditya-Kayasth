package com.example.rcoem.demojpa.services;

import java.util.List;

import com.example.rcoem.demojpa.model.Employee;
import com.example.rcoem.demojpa.repository.EmpRepository;
import com.example.rcoem.demojpa.services.EmpServicesInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeServices implements EmpServicesInterface {

    @Autowired
    private EmpRepository repository;

    @Override
    public Employee save(Employee obj) {
        return repository.save(obj);
    }

    @Override
    public List<Employee> getAll() {
        return repository.findAll();
    }

    @Override
    public Employee getById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Employee update(Employee obj) {
        return repository.save(obj);
    }

    @Override
    public String delete(int id) {
        repository.deleteById(id);
        return "Deleted Successfully";
    }
}