import { defineStore, storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import api from '@/utils/api'
import { useTasksStore } from '@/stores/TasksStore'
import { useMenuStore } from '@/stores/MenuStore'

interface List {
  title: string
  updated_at?: any
  id?: number
}

interface BaseData {
  value: List | List[]
  error: string | null
  loading: boolean
}

export const useListsStore = defineStore('lists', () => {
  const tasksStore = useTasksStore()
  const menuStore = useMenuStore()

  const lists = reactive<BaseData>({
    value: [] as List[],
    error: '',
    loading: false
  })
  const newList = reactive<BaseData>({
    value: { title: '' },
    error: null,
    loading: false
  })
  const toggle = reactive(new Map())
  const selectedList = ref()

  const getAll = async () => {
    try {
      lists.loading = true
      const { data } = await api.get('/todos')
      lists.value = data.data
    } catch (e: any) {
      lists.error = e?.response?.data?.message ?? 'An unexpected error occurred'
    } finally {
      lists.loading = false
    }
  }
  const create = async () => {
    try {
      newList.loading = true
      const { data } = await api.post('/todos', newList.value)
      if (Array.isArray(lists.value)) lists.value.push(data.data as List)
      newList.value = { title: '' }
    } catch (e: any) {
      newList.error = e?.response?.data?.message ?? 'An unexpected error occurred'
    } finally {
      newList.loading = false
    }
  }
  const selectList = async (list: any) => {
    try {
      const { isOpen } = storeToRefs(menuStore)
      selectedList.value = list
      toggle.set(list.id, true)
      await tasksStore.getAll()
      isOpen.value = !isOpen.value
    } catch (e: any) {
      toggle.set(list.id, e?.response?.data?.message ?? 'An unexpected error occurred')
    } finally {
      toggle.set(list.id, false)
    }
  }
  const deleteList = async (list: List) => {
    try {
      toggle.set(list.id, true)
      await api.delete(`/todos/${list.id}`)
      if (Array.isArray(lists.value)) lists.value = lists.value.filter((t) => t.id !== list.id)
    } catch (e: any) {
      toggle.set(list.id, e?.response?.data?.message ?? 'An unexpected error occurred')
    } finally {
      toggle.set(list.id, false)
    }
  }

  return {
    lists,
    newList,
    toggle,
    selectedList,

    getAll,
    create,
    selectList,
    deleteList
  }
})
