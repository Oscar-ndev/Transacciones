package com.example.api1.data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class Transaction {

    @Pattern(regexp = "^[a-zA-Z]+$", message = "Operación debe contener unicamente caracteres")
    private String operacion;

    @Pattern(regexp = "^\\d+\\.\\d{2}$", message = "Importe debe tener formato de moneda (100.00)")
    private String importe;

    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Cliente debe contener unicamente caracteres")
    private String cliente;

    @NotBlank(message = "El secreto no puede estar vacío")
    private String secreto;


}
