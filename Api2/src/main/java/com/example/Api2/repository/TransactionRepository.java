package com.example.Api2.repository;

import com.example.Api2.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

    @Modifying
    @Query("UPDATE TransactionEntity t SET t.estatus = 'Cancelada' WHERE t.id = :id AND t.referencia = :referencia AND t.estatus = 'Aprobada'")
    int cancelarTransaccion(@Param("id") Long id, @Param("referencia") String referencia);

    @Query("SELECT t FROM TransactionEntity t WHERE t.referencia = :referencia")
    Optional<TransactionEntity> encontrarPorReferencia(@Param("referencia") String referencia);
}
