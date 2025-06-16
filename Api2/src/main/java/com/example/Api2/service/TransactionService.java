package com.example.Api2.service;

import com.example.Api2.dto.TransactionResponse;
import com.example.Api2.entity.TransactionEntity;
import com.example.Api2.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Random;

@Service
public class TransactionService implements ITransactionService{

    @Autowired
    private TransactionRepository repository;

    @Override
    public TransactionResponse guardarTransaccion(TransactionEntity transaction) {

        String referencia = String.format("%06d", new Random().nextInt(999999));

        transaction.setReferencia(referencia);
        transaction.setEstatus("Aprobada");

        TransactionEntity guardada = repository.save(transaction);

        TransactionResponse response = new TransactionResponse();
        response.setId(guardada.getId());
        response.setEstatus(guardada.getEstatus());
        response.setReferencia(guardada.getReferencia());
        response.setOperacion(guardada.getOperacion());

        return response;
    }

    @Override
    public List<TransactionEntity> obtenerTodas() {
        return repository.findAll();
    }

    @Override
    public TransactionEntity buscarPorReferencia(String referencia) {
        return repository.encontrarPorReferencia(referencia)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Transaccion no encontrada"));
    }

    @Transactional
    public int cancelar(Long id, String referencia){
        return repository.cancelarTransaccion(id, referencia);
    }
}
