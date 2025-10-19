import { useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as api from '../services/todos.api.js'

const KEY = ['todos']

export function useTodosQuery() {
  const qc = useQueryClient()

  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: KEY,
    queryFn: api.getTodos
  })

  const counts = useMemo(() => {
    const all = data.length
    const done = data.filter(t => t.done).length
    const active = all - done
    return { all, active, done }
  }, [data])

  // Add — optimistic
  const addMutation = useMutation({
    mutationFn: api.addTodo,
    onMutate: async (title) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData(KEY) || []
      const optimistic = [{ id: 'temp-'+Date.now(), title, done: false, createdAt: new Date().toISOString() }, ...prev]
      qc.setQueryData(KEY, optimistic)
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: KEY })
    }
  })

  // Toggle — optimistic
  const toggleMutation = useMutation({
    mutationFn: ({ id, nextDone }) => api.updateTodo(id, { done: nextDone }),
    onMutate: async ({ id, nextDone }) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData(KEY) || []
      qc.setQueryData(KEY, prev.map(t => t.id === id ? { ...t, done: nextDone } : t))
      return { prev }
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(KEY, ctx.prev) },
    onSettled: () => { qc.invalidateQueries({ queryKey: KEY }) }
  })

  // Update title — optimistic
  const titleMutation = useMutation({
    mutationFn: ({ id, title }) => api.updateTodo(id, { title }),
    onMutate: async ({ id, title }) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData(KEY) || []
      qc.setQueryData(KEY, prev.map(t => t.id === id ? { ...t, title } : t))
      return { prev }
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(KEY, ctx.prev) },
    onSettled: () => { qc.invalidateQueries({ queryKey: KEY }) }
  })

  // Delete — optimistic
  const deleteMutation = useMutation({
    mutationFn: (id) => api.deleteTodo(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY })
      const prev = qc.getQueryData(KEY) || []
      qc.setQueryData(KEY, prev.filter(t => t.id !== id))
      return { prev }
    },
    onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(KEY, ctx.prev) },
    onSettled: () => { qc.invalidateQueries({ queryKey: KEY }) }
  })

  return {
    data, isLoading, isError, error, counts,
    addTodo: (title) => addMutation.mutate(title),
    toggleTodo: (todo, nextDone) => toggleMutation.mutate({ id: todo.id, nextDone }),
    updateTitle: (todo, title) => titleMutation.mutate({ id: todo.id, title }),
    deleteTodo: (todo) => deleteMutation.mutate(todo.id)
  }
}
