import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
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


