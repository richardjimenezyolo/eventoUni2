<template>
  <form @submit.prevent="save">
    <article>
      <header><h3>Nuevo Evento</h3></header>

      <input v-model="form.name" required type="text" placeholder="Nombre del evento" />
      
      <select v-model="form.college" required>
        <option value="" disabled selected>Seleccione una universidad</option>
        <option>unapec</option>
        <option>Intec</option>
        <option>Puccm</option>
      </select>
      
      <select v-model="form.type" required>
        <option value="" disabled selected>Tipo de evento</option>
        <option>Curso</option>
        <option>Conferencia</option>
        <option>Taller</option>
        <option>otro</option>
      </select required>
      <input v-model="form.at" required type="datetime-local" placeholder="Fecha" />
      <footer class="flex justify-end gap-2">
        <button class="secondary" @click="router.back()">Cancelar</button>
        <button>Guardar</button>
      </footer>
    </article>
  </form>
</template>

<script setup>
import { auth, db } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  name: null,
  college: '',
  type: '',
  at: null
})
onAuthStateChanged(auth, (user) => {
  if (!user) {
    router.push('/login')
    alert('You need to be logged in to perform this action')
  }
})

const save = async () => {
    try {
        await addDoc(collection(db, 'events'), form.value)
        await router.push('/')
    } catch(e) {
        alert(e)
    }
}
</script>
