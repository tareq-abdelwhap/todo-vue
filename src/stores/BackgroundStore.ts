import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBackgroundStore = defineStore('background', () => {
  const supportedGradients = ref({
    red: 'bg-gradient-to-r from-red-600 to-red-900',
    blue: 'bg-gradient-to-r from-blue-600 to-blue-900',
    green: 'bg-gradient-to-r from-green-600 to-green-900',
    yellow: 'bg-gradient-to-r from-yellow-600 to-yellow-900',
    purple: 'bg-gradient-to-r from-purple-600 to-purple-900',
    pink: 'bg-gradient-to-r from-pink-600 to-pink-900',
    indigo: 'bg-gradient-to-r from-indigo-600 to-indigo-900'
  })
  type SupportedGradients = keyof typeof supportedGradients.value

  const activeGradient = ref(localStorage.getItem('gradient') || supportedGradients.value.purple)

  const changeBackground = (gradient: SupportedGradients) => {
    activeGradient.value = supportedGradients.value[gradient]
    localStorage.setItem('gradient', activeGradient.value)
  }

  return {
    supportedGradients,
    activeGradient,

    changeBackground
  }
})
