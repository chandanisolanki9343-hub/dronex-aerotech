import api from "./api";

/**
 * Log in the admin user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} response data containing JWT token and admin info
 */
export const loginAdmin = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};
