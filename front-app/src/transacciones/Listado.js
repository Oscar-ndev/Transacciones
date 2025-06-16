import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Listado() {

    const urlBase = "http://localhost:8081/api2/transaction";

    const[transacciones, setTransaccion] = useState([]);

    useEffect(() => {
        cargarLista();
    }, []);

    const cargarLista = async () => {

        const resultado = await axios.get(urlBase);
        console.log(resultado.data);
        setTransaccion(resultado.data);
        
    }

    return (
        <div className="container">
            <div className="container text-center" style={{ margin: "30px" }}>
                <h2>Transacciones</h2>
            </div>
            <table className="table table-bordered table-striped table-hover text-center ">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Operación</th>
                        <th scope="col">Importe</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Referencia</th>
                        <th scope="col">Estatus</th>
                        <th scope="col">Secreto</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Iteración de transacciones
                        transacciones.map((transaccion, indice) => (
                        <tr key={indice}>
                        <th scope="row">{transaccion.id}</th>
                        <td>{transaccion.operacion}</td>
                        <td>{transaccion.importe}</td>
                        <td>{transaccion.cliente}</td>
                        <td>{transaccion.referencia}</td>
                        <td>{transaccion.estatus}</td>
                        <td>{transaccion.secreto}</td>
                        </tr>
                        ))
                    
                    }
                </tbody>
            </table>
        </div>
    );
}
