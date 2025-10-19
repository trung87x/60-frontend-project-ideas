import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
export const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

// CRUD
export async function getTodos() {
  const { data } = await http.get('/todos?_sort=createdAt&_order=desc')
  return data
}

export async function addTodo(title) {
  const payload = { title, done: false, createdAt: new Date().toISOString() }
  const { data } = await http.post('/todos', payload)
  return data
}

export async function updateTodo(id, patch) {
  const { data } = await http.patch(`/todos/${id}`, { ...patch, updatedAt: new Date().toISOString() })
  return data
}

export async function deleteTodo(id) {
  await http.delete(`/todos/${id}`)
  return true
}
