export const handleUpload = async (selectedFile) => {

    if (!selectedFile) return;

    const encodedFileName = encodeURIComponent(selectedFile.name);
    const formData = new FormData();
    formData.append('file', selectedFile, encodedFileName);

    try {
        await fetch('http://localhost:8080/api/file/', {
            method: 'POST',
            body: formData,
        });
    } catch (error) {
        console.error('Error:', error);
    }
};
