import {COMPLAINT_CONTROLLER, GET_COMPLAINTS_BY_TENANT_OR_ADMIN} from '../constants/apiEndpoints'


export const createComplaint = async (complaintData, documentUser) => {
    const data = {
        ubicacion: complaintData.complaintLocation,
        descripcion: complaintData.complaintDescription,
        identificador: complaintData.unitID,
        codigoEdificio: complaintData.buildingName.buildingID,
        imagenesByIdReclamo: [{
            dataFoto: complaintData.image,
            tipo: complaintData.extensionImage
        }],
        personasByDocumento: {
            documento: documentUser
        }

    }
    const saveComplaint = await fetch(COMPLAINT_CONTROLLER,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
    return saveComplaint;
}

export const getComplaints = async (tenantDocument = null) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const url = tenantDocument
        ? `${GET_COMPLAINTS_BY_TENANT_OR_ADMIN}?tenantDocument=${tenantDocument}`
        : GET_COMPLAINTS_BY_TENANT_OR_ADMIN;

    const response = await fetch(url, requestOptions)
    return response;
};
