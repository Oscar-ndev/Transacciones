package com.example.Api2.service;

import com.example.Api2.dto.TransactionResponse;
import com.example.Api2.entity.TransactionEntity;

import java.util.List;

public interface ITransactionService {

    public TransactionResponse guardarTransaccion(TransactionEntity transaction);
    public List<TransactionEntity> obtenerTodas();
    public TransactionEntity buscarPorReferencia(String referencia);
}
