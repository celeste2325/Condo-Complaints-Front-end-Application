import { crearReclamo,  getReclamos} from './../constants'


export const crear_reclamo = async (reclamo, documento) => {
    const data = {
        ubicacion: reclamo.ubicacion,
        descripcion: reclamo.descripcion,
        identificador: reclamo.edificio.codigoUnidad,
        codigoEdificio:reclamo.edificio.codigoEdificio,
        imagenesByIdReclamo:[{
            dataFoto: reclamo.fotos
        }],
        personasByDocumento: {
            documento: documento
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