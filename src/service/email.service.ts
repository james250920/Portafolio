import axios from 'axios';
import type { sendEmailParams } from './model';

const API_URL = `https://${import.meta.env.VITE_URL_Api}`;

export const sendEmail = async (params: sendEmailParams): Promise<sendEmailParams> => {
  try {
    const response = await axios.post<sendEmailParams>(`${API_URL}/send-email`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error en el servicio de email:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Error al enviar el email');
    }
    console.error('Error en el servicio de email:', error);
    throw error;
  }
};
