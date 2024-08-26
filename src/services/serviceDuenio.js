import {getDuenio} from '../constants'

export const getDuenioByDocumento = async (documento, contrasenia) => {
    let header = new Headers();
    //header.set('Content-Type', 'application/json');
    let username = "DNI30161468";
    let password = "1234";


    let base64 = require('base-64');
    let encoded = base64.encode(username + ":" + password);
    let auth = 'Basic ' + encoded;
    //header.set('Authorization', auth);
    console.log(auth)

    var requestOptions = {
        method: 'GET',
        headers: header,
        redirect: 'follow'
    };

    return await fetch(`${getDuenio}?documento=${documento}`, requestOptions)
        .then((response) => response.text())
        .then((data) => {
            return data;
        })
        .catch((error) => {
            return error;
        });
}
