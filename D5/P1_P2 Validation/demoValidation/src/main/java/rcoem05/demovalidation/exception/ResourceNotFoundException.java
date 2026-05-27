package rcoem05.demovalidation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException { // 1. Must extend RuntimeException

    public ResourceNotFoundException(String message) {
        super(message); // 2. Pass the message up to the parent class
    }
}