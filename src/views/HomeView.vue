<template>
  <div class="flex justify-center">
    <h3>Eventos universitarios cerca de ti</h3>
  </div>
  <hr class="mt-0 mb-4" />

  <article v-if="loading" aria-busy="true"></article>
  <section v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <article v-for="({ uid, data: event }, idx) in events" :key="idx">
      <header>{{ event.name }}</header>
      <ul>
        <li>Tipo: {{ event.type }}</li>
        <li>Lugar: {{ event.college }}</li>
        <li>Fecha: {{ new Date(event.at).toLocaleString() }}</li>
      </ul>
      <footer class="flex justify-end">
        <RouterLink :to="`/events/${uid}`">
          <button class="outline p-2">Mas detalles</button>
        </RouterLink>
      </footer>
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
    events.value.push({
      uid: doc.id,
      data: doc.data()
    })
  })
  loading.value = false
})
</script>
