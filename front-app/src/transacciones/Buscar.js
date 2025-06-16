import axios from "axios";
import React, { useState } from "react";

export default function Buscar() {
  const [forma, setForma] = useState({
        referencia:""
    },[])

    const{referencia} = forma

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
        const urlBase = `http://localhost:8081/api2/transaction/buscar?referencia=${referencia}`;
        
        try{
            const reponse = await axios.get(urlBase);
            const data = reponse.data
            setAlerta('success');
            setMensaje(`Transacción encontrada correctamente:\nid:${data.id}\nOperación: ${data.operacion}\nImporte: ${data.importe}\nCliente: ${data.cliente}\nReferencia: ${data.referencia}\nEstatus: ${data.estatus}\nSecreto: ${data.secreto}`);
            setForma({
            referencia: '',
            });
        }catch(e){
            setAlerta('danger');
            setMensaje("Error al buscar la transaccion");
        }

    }

    return (
        
        <div className="container">
            <div className="container text-center" style={{margin:"30px"}}>
                <h2>Buscar por Referencia</h2>
            </div>
            <div className="container">
            <form onSubmit={(e) => onSubmit(e)}>
                
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
                
                <div className='text-center'>
                <button type="submit" className="btn btn-primary">
                    Buscar
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
