<template>
  <form @submit.prevent="save" class="mx-auto w-2/3">
    <article>
      <header><h3>Nuevo Evento</h3></header>

      <input v-model="form.name" required type="text" placeholder="Nombre del evento" />

      <div class="grid">
        <select v-model="form.type" required>
          <option value="" disabled selected>Tipo de evento</option>
          <option>Curso</option>
          <option>Conferencia</option>
          <option>Taller</option>
          <option>otro</option>
        </select>

        <select v-model="form.college" required>
          <option value="" disabled selected>Seleccione una universidad</option>
          <option>unapec</option>
          <option>Intec</option>
          <option>Puccm</option>
        </select>
      </div>

      <input v-model="form.at" required type="datetime-local" placeholder="Fecha" />
      <textarea v-model="form.description" placeholder="Descripción"></textarea>

      <footer class="flex justify-end gap-2">
        <button :aria-busy="loading" class="secondary" @click="router.back()">Cancelar</button>
        <button :aria-busy="loading">Guardar</button>
      </footer>
    </article>
  </form>
</template>

<script setup>
import { auth, db } from '@/firebase'
import { useAuthStore } from '@/stores/counter'
import { useModal } from '@/stores/modal'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useAuthStore()
const modalStore = useModal()

const form = ref({
  name: null,
  college: '',
  type: '',
  at: null,
  description: ''
})

const loading = ref(false)

onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push('/login')
    modalStore.alert('You need to be logged in to perform this action', 'Auth error')
  }
})

const save = async () => {
  try {
    loading.value = true
    await addDoc(collection(db, 'events'), {
      ...form.value,
      user_uid: userStore.user.uid
    })
    await router.push('/')
  } catch (e) {
    alert(e)
  } finally {
    loading.value = false
  }
}
</script>
