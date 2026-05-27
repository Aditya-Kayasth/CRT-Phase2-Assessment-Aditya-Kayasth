package com.example.demojunit;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class CalculatorServiceTest {

    CalculatorService service = new CalculatorService();

    @Test
    void testadd(){
        int result = service.add(1,2);

        assertEquals(15,result);
    }
}
