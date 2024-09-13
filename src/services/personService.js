import {PERSON_CONTROLLER} from "../constants/apiEndpoints";

export const getPersonByDocument = async (documentID) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const response = await fetch(`${PERSON_CONTROLLER}${documentID}`, requestOptions)
        if (!response.ok) {
            const errorMessage = await response.text();
            return {
                success: false,
                error: errorMessage
            }
        }
        const data = await response.json();
        return {
            success: true,
            data: data
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}
