import {
    COMPLAINT_CONTROLLER,
    GET_COMPLAINTS_BY_TENANT_OR_ADMIN,
    UPDATE_COMPLAINT_STATUS
} from '../constants/apiEndpoints'

export const createComplaint = async (complaintData, documentUser) => {
    const data = {
        location: complaintData.complaintLocation,
        description: complaintData.complaintDescription,
        unitID: complaintData.unitID,
        buildingID: complaintData.buildingName.buildingID,
        imagesByComplaintID: [{
            path: complaintData.image,
            extension: complaintData.extensionImage
        }],
        personByDocument: {
            document: documentUser
        }
    }
    try {
        const saveComplaint = await fetch(COMPLAINT_CONTROLLER,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            });
        if (!saveComplaint.ok) {
            const errorMessage = await saveComplaint.text();
            return {
                success: false,
                error: errorMessage
            }
        }
        return {
            success: true,
            data: await saveComplaint
        }
    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }

}

export const getComplaints = async (tenantDocument = null) => {
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const url = tenantDocument
        ? `${GET_COMPLAINTS_BY_TENANT_OR_ADMIN}?tenantDocument=${tenantDocument}`
        : GET_COMPLAINTS_BY_TENANT_OR_ADMIN;
    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
            const messageError = await response.text();
            return {
                success: false,
                error: messageError
            }
        }
        return {
            success: true,
            data: await response.json()
        }

    } catch (error) {
        return {
            success: false,
            error: error.message
        }
    }
};

export const updateComplaintStatus = async (data) => {
    const {id, value} = data;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "newStatus": value,
        "complaintID": id
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    return await fetch(UPDATE_COMPLAINT_STATUS, requestOptions);
}
