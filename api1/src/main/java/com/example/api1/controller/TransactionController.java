package com.example.api1.controller;

import com.example.api1.data.Response;
import com.example.api1.data.Transaction;
import com.example.api1.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api1/transaction")
@CrossOrigin(value = "http://localhost:3000") //permitir peticiones desde front-end
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public ResponseEntity<?> procesarTransaccion(@Valid @RequestBody Transaction transaction){
        Response response = service.procesar(transaction);
        return ResponseEntity.ok(response);
    }
}
