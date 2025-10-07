import axios from 'axios'

// Get the base URL and ensure it ends with /api
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_API_BASE_URL;
  if (envURL) {
    // If it already ends with /api, use it as is
    if (envURL.endsWith('/api')) {
      return envURL;
    }
    // If it doesn't end with /api, add it
    return `${envURL}/api`;
  }
  // Default to relative path
  return '/api';
};

const client = axios.create({
  baseURL: getBaseURL(),
})

export async function fetchEmployees() {
  const { data } = await client.get('/employees')
  return data
}

export async function createEmployee(payload) {
  const { data } = await client.post('/employees', payload)
  return data
}

export async function updateEmployee(id, payload) {
  const { data } = await client.put(`/employees/${id}`, payload)
  return data
}

export async function deleteEmployee(id) {
  await client.delete(`/employees/${id}`)
}


