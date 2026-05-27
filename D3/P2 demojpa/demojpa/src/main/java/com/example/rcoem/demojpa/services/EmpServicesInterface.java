package com.example.rcoem.demojpa.services;

import com.example.rcoem.demojpa.model.Employee;

import java.util.List;


public interface EmpServicesInterface {

    Employee save(Employee obj);

    List<Employee> getAll();

    Employee getById(int id);

    Employee update(Employee obj);

    String delete(int id);
}