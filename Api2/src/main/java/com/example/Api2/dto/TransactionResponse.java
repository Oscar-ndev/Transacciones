package com.example.Api2.dto;

import lombok.Data;

@Data
public class TransactionResponse {
    private Long id;
    private String estatus;
    private String referencia;
    private String operacion;
}
