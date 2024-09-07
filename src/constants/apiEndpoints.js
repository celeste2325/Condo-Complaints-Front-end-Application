const API_BASE_URL = 'http://localhost:8080/api/';
const BUILDING_CONTROLLER = `${API_BASE_URL}building/`;
const COMPLAINT_CONTROLLER = `${API_BASE_URL}complaint/`;
const FILE_CONTROLLER = `${API_BASE_URL}file/`;
const IMAGE_CONTROLLER = `${API_BASE_URL}image/`;
const UNIT_CONTROLLER = `${API_BASE_URL}unit/`;

const GET_BUILDING_WITH_UNITS_BY_TENANT_ID = `${BUILDING_CONTROLLER}getBuildingWithUnits/`;
const GET_COMPLAINTS_BY_TENANT_OR_ADMIN = `${COMPLAINT_CONTROLLER}getComplaintsByTenantOrAdmin/`;
const GET_UNIT_BY_UNIT_ID = `${UNIT_CONTROLLER}getUnit/`;


const registrarse = 'http://localhost:8080/api/user/authenticate';
const iniciarSesion = 'http://localhost:8080/api/user/';
const validarDocumentoPersona = 'http://localhost:8080/api/persona/';
const getDuenio = 'http://localhost:8080/api/duenio/getDueniosRequest/';

export {
    registrarse,
    iniciarSesion,
    validarDocumentoPersona,
    getDuenio,
    BUILDING_CONTROLLER,
    GET_UNIT_BY_UNIT_ID,
    COMPLAINT_CONTROLLER,
    GET_BUILDING_WITH_UNITS_BY_TENANT_ID,
    GET_COMPLAINTS_BY_TENANT_OR_ADMIN,
    FILE_CONTROLLER,
    IMAGE_CONTROLLER
}
