import {LOGIN, REGISTER} from '../constants/apiEndpoints';

export const login = async (loginData) => {
    const data = {
        document: loginData.document,
        password: loginData.password
    }
    return postRequest(LOGIN, data);
}
export const signUp = async (loginData) => {
    const data = {
        document: loginData.document,
        password: loginData.password
    }
    return postRequest(REGISTER, data);
}
const postRequest = async (url, data) => {
    try {
        const response = await fetch(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
        if (!response.ok) {
            const errorMessage = await response.text();
            return {
                success: false,
                error: errorMessage
            };
        }
        return {
            success: true,
            data: await response.text()
        }
    } catch
        (error) {
        return {
            success: false,
            error: error.message
        }
    }
}


