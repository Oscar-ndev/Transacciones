import axios from "axios";
import React, { useState } from "react";

export default function Estatus() {
  const [forma, setForma] = useState({
        id:"",
        referencia:"",
        estatus:""
    },[])

    const{id,referencia,estatus} = forma

    const [mensaje, setMensaje] = useState('');

    const [alerta, setAlerta] = useState('');

     const errores = [];

    const onInputChange = (e) => {
        setForma({...forma, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(forma.referencia)) {
            errores.push('La referencia debe tener exactamente 6 dígitos.');
            setMensaje(errores.join('\n'));
            setAlerta('warning');
            return;
        }
        const urlBase = "http://localhost:8081/api2/transaction/cancelar";
        
        try{
            const reponse = await axios.patch(urlBase, forma);
            setAlerta('success');
            setMensaje("Transacción cancelada correctamente");
            setForma({
            id: '',
            referencia: '',
            estatus: '',
            });
        }catch(e){
            setAlerta('danger');
            setMensaje("Error al cancelar la transaccion");
        }

        
            


    }

    return (
        
        <div className="container">
            <div className="container text-center" style={{margin:"30px"}}>
                <h2>Cambiar Estatus</h2>
            </div>
            <div className="container">
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                    <label for="id" className="form-label">
                        Id:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="id"
                        name="id"
                        value={id}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca el id"
                        
                    />
                </div>
                <div className="mb-4">
                     <label for="referencia" className="form-label">
                        Referencia:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="referencia"
                        name="referencia"
                        value={referencia}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca los 6 dígitos de la referencia"
                        
                    />
                </div>
                <div className="mb-4">
                     <label for="estatus" className="form-label">
                        Estatus:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="estatus"
                        name="estatus"
                        value={estatus}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca el estatus 'cancelar'"
                    />
                </div>
                
                
                <div className='text-center'>
                <button type="submit" className="btn btn-warning">
                    Cancelar Transacción
                </button>
                </div>
                {mensaje && (
                    <div className={`alert alert-${alerta} mt-3`} role="alert">
                        <pre className="m-0">{mensaje}</pre>
                    </div>
                )}
            </form>
            </div>
        </div>
    );
}
