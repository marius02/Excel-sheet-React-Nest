import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const uploadFile = async (file: File): Promise<{ filename: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post<Response>(`${apiUrl}/excelMng/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data as unknown as { filename: string };
};
