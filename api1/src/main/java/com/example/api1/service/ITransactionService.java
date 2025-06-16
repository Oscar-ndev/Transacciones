package com.example.api1.service;

import com.example.api1.data.Response;
import com.example.api1.data.Transaction;

public interface ITransactionService {

    public Response procesar(Transaction transaction);
}
