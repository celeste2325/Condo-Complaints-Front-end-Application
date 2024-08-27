import {crearReclamo, getReclamos} from './../constants'


export const createComplaint = async (complaintData, documentUser) => {
    const data = {
        ubicacion: complaintData.complaintLocation,
        descripcion: complaintData.complaintDescription,
        identificador: complaintData.unitID,
        codigoEdificio: complaintData.buildingName.buildingID,
        imagenesByIdReclamo: [{
            dataFoto: complaintData.image
        }],
        personasByDocumento: {
            documento: documentUser
        }

    }
    const respuestaLogin = await fetch(crearReclamo,
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

export const devuelveReclamos = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const respuesta = await fetch(getReclamos, requestOptions)
    return respuesta;
};
