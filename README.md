# Sistema de Transacciones

### API 1

Esta API recibe el siguiente JSON:

```json
{
  "operacion": "Compra",
  "importe": "2000.00",
  "cliente": "Jose Luis",
  "secreto": "jejdjw134&3#$$"
}
```

Funciones de la API1:

- Validar que los atributos del JSON cumplan lo siguiente:
  - `operacion`: debe ser texto
  - `importe`: debe tener un formato de moneda
  - `cliente`: debe ser texto
- El atributo `secreto` se cifra con AES-256. Al llegar a la API se descifra y se envía en claro a la segunda API.
#### Una vez siendo válido el JSON, se envía a la segunda API.

### API 2

Funciones de la API2:

- Almacenar los datos recibidos en una base de datos en memoria (H2).
- Estructura de la base de datos:

  ```
  PK, operacion, importe, cliente, referencia, estatus, secreto
  ```

- Al guardar los datos:
  - Se genera una referencia aleatoria de 6 dígitos
  - Se asigna el estatus “Aprobada”
  - Se envía una respuesta a la API1 con el siguiente formato:

```json
{
  "id": "2376",
  "estatus": "Aprobada",
  "referencia": "262737",
  "operacion": "venta"
}
```
---


## ▶️ Ejecución 

```bash

git clone https://github.com/Oscar-ndev/Transacciones
cd mi-proyecto

# Terminal 1
cd api1
./mvnw spring-boot:run

# Terminal 2
cd api2
./mvnw spring-boot:run

#Terminal 3
cd frontend
npm install
npm start
```

