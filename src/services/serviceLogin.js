import {iniciarSesion, registrarse, validarDocumentoPersona} from '../constants/apiEndpoints';

export const getIncioDeSesion = async (documento, contrasenia) => {
    const data = {
        documento: documento,
        contrasenia: contrasenia
    }
    return login_registro(iniciarSesion, data);
}

export const registro = async (documento, contrasenia) => {
    const data = {
        documento: documento,
        contrasenia: contrasenia
    }
    return login_registro(registrarse, data);
}

const login_registro = async (url, data) => {
    const response = await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    return response;
}

export const getUserByDocument = async (document) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(`${validarDocumentoPersona}${document}`, requestOptions)
    return response;
}

