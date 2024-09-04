import {saveFile} from './../constants'

export const handleUpload = async (selectedFile, complaintID) => {

    if (!selectedFile) return;

    const formData = new FormData();
    const encodedFileName = encodeURIComponent(selectedFile.name);
    formData.append('file', selectedFile, encodedFileName);

    try {
        const saveImage = await fetch(`${saveFile}${complaintID}/`, {
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
