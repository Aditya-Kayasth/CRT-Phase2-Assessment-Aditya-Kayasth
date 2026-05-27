package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StudentDto {

    @NotBlank(message = "Name must not be blank")
    private String name;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be 18 or above")
    private Integer age;
}
