import { defineStore, storeToRefs } from 'pinia'
import { reactive } from 'vue'
import api from '@/utils/api'
import { useListsStore } from '@/stores/ListsStore'

interface Task {
  name: string
  list_id: number | string | undefined
  is_completed: boolean
  updated_at?: any
  id?: number
}

interface baseData {
  value: Task | Task[]
  error: string | null
  loading: boolean
}

export const useTasksStore = defineStore('tasks', () => {
  const listStore = useListsStore()

  const tasks = reactive<baseData>({
    value: [],
    error: null,
    loading: false
  })
  const newTask = reactive<baseData>({
    value: { name: '', list_id: 0, is_completed: false },
    error: null,
    loading: false
  })
  const toggle = reactive(new Map())

  const getAll = async () => {
    try {
      const { selectedList } = storeToRefs(listStore)
      tasks.loading = true
      const { data } = await api.get(`/tasks`, { params: { list_id: selectedList.value.id } })
      tasks.value = data.data
    } catch (e: any) {
      tasks.error = e?.response?.data?.message ?? 'An unexpected error occurred'
    } finally {
      tasks.loading = false
    }
  }

  const create = async () => {
    try {
      const { selectedList } = storeToRefs(listStore)
      newTask.loading = true
      if (!Array.isArray(newTask.value)) newTask.value.list_id = selectedList.value.id
      const { data } = await api.post('/tasks', newTask.value)
      if (Array.isArray(tasks.value)) tasks.value.push(data.data)
      newTask.value = { name: '', list_id: selectedList.value.id, is_completed: false }
    } catch (e: any) {
      newTask.error = e?.response?.data?.message ?? 'An unexpected error occurred'
    } finally {
      newTask.loading = false
    }
  }

  const toggleTask = async (task: Task) => {
    try {
      toggle.set(task.id, true)
      const { data } = await api.patch(`/tasks/${task.id}`, {
        name: task.name,
        is_completed: !task.is_completed
      })
      task.is_completed = data.data.is_completed
      task.updated_at = data.data.updated_at
    } catch (e: any) {
      toggle.set(task.id, e?.response?.data?.message ?? 'An unexpected error occurred')
    } finally {
      toggle.set(task.id, false)
    }
  }

  const deleteTask = async (task: Task) => {
    try {
      toggle.set(task.id, true)
      await api.delete(`/tasks/${task.id}`)
      if (Array.isArray(tasks.value)) tasks.value = tasks.value.filter((t) => t.id !== task.id)
    } catch (e: any) {
      toggle.set(task.id, e?.response?.data?.message ?? 'An unexpected error occurred')
    } finally {
      toggle.set(task.id, false)
    }
  }

  return {
    tasks,
    newTask,
    toggle,

    getAll,
    create,
    toggleTask,
    deleteTask
  }
})
