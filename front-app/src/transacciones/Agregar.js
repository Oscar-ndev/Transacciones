import axios from "axios";
import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';

export default function Agregar() {

    let navegacion = useNavigate();

    const [forma, setForma] = useState({
        operacion:"",
        importe:"",
        cliente:"",
        secreto:""
    },[])

    const{operacion,importe,cliente,secreto} = forma

    const [mensaje, setMensaje] = useState('');

    const [alerta, setAlerta] = useState('');

     const AES_KEY = 'qM9zL!r3Yv@8XpA2Bv#7Nc$dEw4JfTgH';

     const validarFormulario = ({operacion, importe, cliente}) => {
        const errores = [];

        if (!/^[a-zA-Z]+$/.test(operacion)) {
            errores.push('La operación debe contener solo caracteres.');
        }
        if (!/^\d+(\.\d{2})$/.test(importe)) {
            errores.push('El importe debe tener formato de moneda (100.00).');
        }

        if (!/^[a-zA-Z ]+$/.test(cliente)) {
            errores.push('El nombre del cliente debe contener solo caracteres.');
        }

        return errores;

     }

    const onInputChange = (e) => {
        setForma({...forma, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const errores = validarFormulario(forma);
        if (errores.length > 0) {
            setMensaje(errores.join('\n'));
            setAlerta('warning');
        return;
        }
        const urlBase = "http://localhost:8080/api1/transaction";
        const secretoCifrado = CryptoJS.AES.encrypt(
            forma.secreto,
            CryptoJS.enc.Utf8.parse(AES_KEY),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
            ).toString();
            console.log(secretoCifrado);
        const datos = {
            ...forma,
            secreto: secretoCifrado
    };
        try{
            const reponse = await axios.post(urlBase, datos);
            const data = reponse.data
            setAlerta('success');
            setMensaje(`Transacción realizada correctamente\nRespuesta:\nid: ${data.id}\nestatus: ${data.estatus}\nreferencia: ${data.referencia}\noperación: ${data.operacion}`);
            setForma({
            operacion: '',
            importe: '',
            cliente: '',
            secreto: ''
            });
        }catch(e){
            setAlerta('danger');
            setMensaje("Error al enviar la transaccion");
        }

        
            

        navegacion('/');

    }

    return (
        
        <div className="container">
            <div className="container text-center" style={{margin:"30px"}}>
                <h2>Agregar Transacción</h2>
            </div>
            <div className="container">
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-4">
                    <label for="operacion" className="form-label">
                        Operación:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="operacion"
                        name="operacion"
                        value={operacion}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca unicamente carácteres"
                        
                    />
                </div>
                <div className="mb-4">
                     <label for="importe" className="form-label">
                        Importe:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="importe"
                        name="importe"
                        value={importe}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca un formato de moneda (100.00)"
                        
                    />
                </div>
                <div className="mb-4">
                     <label for="cliente" className="form-label">
                        Cliente:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cliente"
                        name="cliente"
                        value={cliente}
                        onChange={(e)=>onInputChange(e)}
                        required
                        placeholder="Introduzca unicamente carácteres"
                        
                    />
                </div>
                <div className="mb-4">
                     <label for="secreto" className="form-label">
                        Secreto:
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="secreto"
                        name="secreto"
                        value={secreto}
                        onChange={(e)=>onInputChange(e)}
                        required
                        
                    />
                </div>
                
                <div className='text-center'>
                <button type="submit" className="btn btn-primary">
                    Submit
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
