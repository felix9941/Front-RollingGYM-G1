import clienteAxios from "./clienteAxios";

/**
 * @param {Object} data - Datos del usuario a registrar
 * @returns {Promise} - Respuesta de la API
 */
export async function registerUser(data) {
  try {
    const response = await clienteAxios.post("/clientes/register", data);
    return { success: true, data: response.data };
  } catch (error) {
    let errorMsg = "No se pudo registrar";
    if (
      error.response?.data?.errors &&
      Array.isArray(error.response.data.errors)
    ) {
      errorMsg = error.response.data.errors[0].msg;
    } else if (error.response?.data?.message) {
      errorMsg = error.response.data.message;
    }
    return { success: false, error: errorMsg };
  }
}
