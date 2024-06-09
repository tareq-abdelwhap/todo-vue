import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const isOpen = ref<boolean>(true)
  const burgerMenu = ref<string[]>([
    'rotate-45 translate-y-[5.2px] opacity-50 group-hover:opacity-100',
    'opacity-0',
    '-rotate-45 -translate-y-[5.2px] opacity-50 group-hover:opacity-100'
  ])

  return {
    isOpen,
    burgerMenu
  }
})
