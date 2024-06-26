import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModal = defineStore('modal', () => {
  const modalZeroState = Object.freeze({
    show: false,
    message: null,
    type: 'error'
  })

  const modal = ref(modalZeroState)

  function alert(message, type) {
    modal.value = {
      show: true,
      message,
      type
    }
  }

  const close = () => {
    console.log('closing modal')
    modal.value = { ...modalZeroState }
  }

  return { modal, alert, close }
})
