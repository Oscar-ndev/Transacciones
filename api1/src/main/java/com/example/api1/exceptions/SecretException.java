package com.example.api1.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SecretException extends RuntimeException{
    public SecretException(String mensaje){
        super(mensaje);
    }
}
