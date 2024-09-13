import {FILE_CONTROLLER, IMAGE_CONTROLLER} from '../constants/apiEndpoints'

export const handleUpload = async (selectedFile, complaintID, imageSelected) => {

    if (!selectedFile) return;

    const formData = new FormData();

    const encodedFileName = encodeURIComponent(imageSelected);
    formData.append('file', selectedFile, encodedFileName);

    try {
        const saveImage = await fetch(`${FILE_CONTROLLER}${complaintID}/`, {
            method: 'POST',
            body: formData,
        });
        if (!saveImage.ok) {
            const errorMessage = await saveImage.text();
            return {
                success: false,
                error: errorMessage
            }
        }
        return {
            success: true,
            data: saveImage
        };
    } catch (error) {
        return {
            success: false,
            data: error.message
        };
    }
};

export const getImage = async (complaintID) => {
    try {
        const response = await fetch(`${IMAGE_CONTROLLER}${complaintID}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            return {
                success: false,
                error: errorMessage
            }
        }
        const imageBlob = await response.blob();
        return {
            success: true,
            data: URL.createObjectURL(imageBlob)
        }
    } catch (error) {
        return {
            success: false,
            data: error.message
        };
    }
}

