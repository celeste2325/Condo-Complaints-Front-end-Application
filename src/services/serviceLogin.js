import { iniciarSesion, registrarse, validarDocumentoPersona } from '../constants';

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
    const respuestaLogin =  await fetch(url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        return respuestaLogin;
}

export const getPersonaByDocumento = async (documento) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
     return await fetch(`${validarDocumentoPersona}${documento}`, requestOptions)
     .then((response) => response.text())
     .then((data) => {
         return data;
     })
     .catch((error) => {
         return error;
     });
}

