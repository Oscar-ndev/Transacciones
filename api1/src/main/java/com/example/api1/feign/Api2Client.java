package com.example.api1.feign;

import com.example.api1.data.Response;
import com.example.api1.data.Transaction;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "api2", url = "http://localhost:8081")
public interface Api2Client {

    @PostMapping("/api2/transaction")
    Response enviarTransaccion(Transaction request);
}
