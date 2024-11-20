import { HEADERS } from '../constants/headers';
import { METHODS } from '../constants/methods';
import { fetchData } from './fetchData';

export const getData = async url => {
  try {
    const data = await fetchData(url, { method: 'GET' });
    return data;
  } catch (err) {
    console.error('Error en getData:', err);
    throw err; // Re-lanzamos el error para que sea manejado en el componente o lugar donde se llama
  }
};

export const postData = async (url, body = {}) => {
  const data = await fetchData(url, {
    method: METHODS.POST,
    body: JSON.stringify(body),
    headers: HEADERS
  });

  return data;
};

export const patchData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: METHODS.PATCH,
      headers: HEADERS,
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.error('Error during patchData:', err);
    throw err;
  }
};

export const deleteData = async url => {
  const data = await fetchData(url, {
    method: METHODS.DELETE,
    headers: HEADERS
  });

  return data;
};
