import {BUILDING_CONTROLLER, GET_BUILDING_WITH_UNITS_BY_TENANT_ID} from '../constants/apiEndpoints'

export const getBuildingsByTenant = async (tenantDocument) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    try {
        const response = await fetch(`${GET_BUILDING_WITH_UNITS_BY_TENANT_ID}${tenantDocument}`, requestOptions)
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        return await response.json();
    } catch (error) {
        return {error: `fetch failed; ${error.message}`};
    }
};

export const create_building = async (data) => {
    const buildingData = {
        "name": data.buildingName,
        "address": data.address
    }
    try {
        const response = await fetch(BUILDING_CONTROLLER,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(buildingData)
            });
        if (!response.ok) {
            const errorMessage = await response.text();
            return {
                success: false,
                error: errorMessage
            }
        }
        return {
            success: true,
            data: response
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }


}
