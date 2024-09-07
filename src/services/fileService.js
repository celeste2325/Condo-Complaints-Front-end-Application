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
            const errorText = await saveImage.text();
            throw new Error(errorText);
        }

        return saveImage;
    } catch (error) {
        return error.message;
    }
};

export const getImage = async (complaintID) => {
    try {
        const response = await fetch(`${IMAGE_CONTROLLER}${complaintID}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const imageBlob = await response.blob();
        const imageObjectURL = URL.createObjectURL(imageBlob);
        return imageObjectURL;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
