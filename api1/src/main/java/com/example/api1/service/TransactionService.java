package com.example.api1.service;


import com.example.api1.data.Response;
import com.example.api1.data.Transaction;
import com.example.api1.feign.Api2Client;
import com.example.api1.security.AES;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService implements ITransactionService{

    @Autowired
    private Api2Client feignClient;

    @Override
    public Response procesar(Transaction transaction){
        String secretoDescifrado = AES.desencriptar(transaction.getSecreto());
        transaction.setSecreto(secretoDescifrado);
        return feignClient.enviarTransaccion(transaction);
    }

}
