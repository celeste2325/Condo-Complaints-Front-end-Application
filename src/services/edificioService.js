import { getEdificio, crearEdificio } from './../constants'

export const getEdificioByCodigo = async (codigo) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const respuesta = await fetch(`${getEdificio}${codigo}`, requestOptions)
    return respuesta;
};

export const crear = async(data) => {
    const datos = {
        "nombre": data.nombre,
        "direccion": data.direccion
    }

    const respuestaLogin = await fetch(crearEdificio,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(datos)
        })
    return respuestaLogin;

}