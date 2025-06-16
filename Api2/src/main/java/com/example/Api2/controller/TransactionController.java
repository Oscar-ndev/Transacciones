package com.example.Api2.controller;

import com.example.Api2.dto.TransactionResponse;
import com.example.Api2.entity.TransactionEntity;
import com.example.Api2.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api2/transaction")
@CrossOrigin(value = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @PostMapping
    public TransactionResponse registrarTransaccion(@RequestBody TransactionEntity transaction){
        return service.guardarTransaccion(transaction);
    }

    @GetMapping
    public List<TransactionEntity> obtener(){
        return service.obtenerTodas();
    }

    @GetMapping("/buscar")
    public TransactionEntity buscarPorReferencia(@RequestParam String referencia){
        return service.buscarPorReferencia(referencia);
    }

    @PatchMapping("/cancelar")
    public ResponseEntity<String> cancelarTransaccion(@RequestBody Map<String, Object> datos){
        try {
            Long id = Long.valueOf(datos.get("id").toString());
            String referencia = datos.get("referencia").toString();
            String estatus = datos.get("estatus").toString();

            if (!estatus.equalsIgnoreCase("cancelar")){
                return ResponseEntity.badRequest().body("El estatus debe ser 'cancelar'");
            }
            int filasAfectadas = service.cancelar(id, referencia);
            if (filasAfectadas>0){
                return ResponseEntity.ok("Transacción cancelada de manera correcta");
            }else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la transacción o ya estaba cancelada");
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Ocurrió un error al cancelar la transacción");
        }
    }
}
