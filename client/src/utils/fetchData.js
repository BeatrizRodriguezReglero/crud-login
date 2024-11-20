export const fetchData = async (url, options = {}) => {
  try {
    // Realizamos la solicitud con las opciones pasadas
    const response = await fetch(url, options);

    // Verificamos si la respuesta fue exitosa (código de estado 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Intentamos convertir la respuesta en formato JSON
    const data = await response.json();
    return data;
  } catch (err) {
    // Si ocurre un error, lo logueamos y retornamos el error
    console.error('Error en fetchData:', err);
    throw err; // Propagamos el error para manejarlo en el lugar donde se llama
  }
};
