<template>
  <div class="flex justify-center">
    <h3>Eventos universitarios cerca de ti</h3>
  </div>
  <hr class="mt-0 mb-4" />

  <article v-if="loading" aria-busy="true"></article>
  <section v-else class="grid grid-cols-3">
    <article v-for="(event, idx) in events" :key="idx">
      <header>{{ event.name }}</header>
      <ul>
        <li>Tipo: {{ event.type }}</li>
        <li>Lugar: {{ event.college }}</li>
        <li>Fecha: {{ new Date(event.at).toLocaleString() }}</li>
      </ul>
    </article>
  </section>
</template>

<script setup>
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const events = ref([])

onMounted(async () => {
  loading.value = true
  const querySnapshot = await getDocs(collection(db, 'events'))

  querySnapshot.forEach((doc) => {
    events.value.push(doc.data())
  })
  loading.value = false
})
</script>
