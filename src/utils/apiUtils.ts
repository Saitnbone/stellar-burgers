// Базовый URL API
export const BASE_URL = process.env.BURGER_API_URL || 'https://norma.nomoreparties.space/api/';

// Функция проверки ответа на ok
const checkResponse = async <T>(res: Response): Promise<T> => {
  const data = await res.json();
  return res.ok ? data : Promise.reject(data);
};

// Функция проверки success
const checkSuccess = <T>(data: TServerResponse<T>): T => {
    if (data.success) {
      return data;
    }
    return Promise.reject(`Ответ не success: ${JSON.stringify(data)}`);
  };