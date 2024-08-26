import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Avatar} from '@mui/material';
import {getEdificioByCodigo} from './../services/edificioService'


const columns = [
    {field: 'idReclamo', headerName: 'ID Reclamo', width: 90},
    {field: 'edificio', headerName: 'Edificio', width: 170},
    {field: 'identificador', headerName: 'Unidad', width: 80},
    {field: 'ubicacion', headerName: 'Ubicación', width: 150},
    {field: 'descripcion', headerName: 'Descripción', width: 200},
    {field: 'estado', headerName: 'Estado', width: 90, editable: true},
    {
        field: 'fotos',
        headerName: 'Imagen',
        width: 90,
        renderCell: params => <Avatar src={params.row.fotos}/>,
        sortable: false,
        filterable: false
    }
    //{ field: 'estado', headerName: 'estado', width: 90, renderCell: params => <Avatar src={params.row.imgs} />, sortable: false, filterable: false },
];

const rows = [
    {
        idReclamo: '',
        edificio: '',
        identificador: '',
        ubicacion: '',
        descripcion: '',
        estado: '',
        fotos: ''
    }
];

export function Reclamo(props) {
    const reclamos = props;
    console.log('reclamoss', reclamos);
    const [datoEdificio, setDatoEdificio] = useState({
        nombre: '',
        direccion: ''
    })
    const [reclamo, setReclamo] = useState(rows)

    useEffect(() => {
        getEdificio();

    }, [reclamos])

    const datosEdificio = async (codigoEdificio) => {
        console.log(codigoEdificio);
        if (codigoEdificio !== '') {
            const respuesta = await getEdificioByCodigo(codigoEdificio).then((response) => response.json());
            console.log('respuesta edificio', respuesta);
            setDatoEdificio({
                nameUser: respuesta.nombre,
                direccion: respuesta.direccion
            });
            return respuesta;
        }

    }
    const getEdificio = async () => {

        const arreglo = [];
        console.log('es extensible ?', Object.isExtensible(arreglo));
        if (reclamos.reclamo.length > 0) {
            reclamos.reclamo.map(async recl => {
                //const respuesta = await datosEdificio(recl.codigoEdificio);

                console.log('datoedificio', datoEdificio);
                console.log('es extensible', Object.isExtensible(arreglo));
                //Object.preventExtensions(arreglo);

                console.log('cargada urlbb', recl.imagenesByIdReclamo[0] ? recl.imagenesByIdReclamo[0].dataFoto : "");

                arreglo.push({
                    ...arreglo,
                    idReclamo: recl.idReclamo,
                    edificio: recl.codigoEdificio,
                    identificador: recl.identificador,
                    ubicacion: recl.ubicacion,
                    descripcion: recl.descripcion,
                    estado: recl.estado,
                    fotos: recl.imagenesByIdReclamo[0] ? recl.imagenesByIdReclamo[0].dataFoto : ""
                })


            });
            console.log('arregloFinal', arreglo);
            return setReclamo(arreglo);
        }

    }
    const seleccionado = (e) => {
        console.log('e', e);
    }
    const mostrar = (e) => {
        console.log('mostrar', e);
    }
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid
                getRowId={(row) => row.idReclamo}
                rows={reclamo}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                autoHeight
                //onCellClick={mostrar}
                onStateChange={mostrar}
                //checkboxSelection
            />
        </div>
    );
}





