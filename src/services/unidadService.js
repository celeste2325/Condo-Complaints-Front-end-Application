import {GET_UNIT_BY_UNIT_ID} from '../constants/apiEndpoints'

export const getUnidadByIdentificador = async (identificador) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const respuesta = await fetch(`${GET_UNIT_BY_UNIT_ID}${identificador}`, requestOptions)
    return respuesta;
}
