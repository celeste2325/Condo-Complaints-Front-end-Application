import { getUnidad } from './../constants'

export const getUnidadByIdentificador = async (identificador) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    const respuesta = await fetch(`${getUnidad}${identificador}`, requestOptions)
    return respuesta;
}