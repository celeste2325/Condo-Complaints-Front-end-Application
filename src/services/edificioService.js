import {BUILDING_CONTROLLER, GET_BUILDING_WITH_UNITS_BY_TENANT_ID} from '../constants/apiEndpoints'

export const getEdificioByCodigo = async (codigo) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const respuesta = await fetch(`${BUILDING_CONTROLLER}${codigo}`, requestOptions)
    return respuesta;
};

export const getBuildingsByTenant = async (tenantDocument) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(`${GET_BUILDING_WITH_UNITS_BY_TENANT_ID}${tenantDocument}`, requestOptions)
    return response;
};

export const crear = async (data) => {
    const datos = {
        "nombre": data.nombre,
        "direccion": data.direccion
    }

    const respuestaLogin = await fetch(BUILDING_CONTROLLER,
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
