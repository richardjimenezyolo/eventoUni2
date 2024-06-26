<template>
  <article v-if="loading" aria-busy="true"></article>
  <article class="lg:mx-auto xl:w-2/3" v-else>
    <header class="flex justify-between items-center">
      <h3 class="m-0">{{ event.name }}</h3>
      <button v-if="userStore.user" class="outline" @click="subscribe">Subscribirme</button>
    </header>

    <table class="striped">
      <tbody>
        <tr>
          <th class="font-bold">Tipo:</th>
          <td>{{ event.type }}</td>
        </tr>
        <tr>
          <th class="font-bold">Fecha</th>
          <td>{{ new Date(event.at).toLocaleString() }}</td>
        </tr>
        <tr>
          <th class="font-bold">Universidad:</th>
          <td>{{ event.college }}</td>
        </tr>
        <tr>
          <th class="font-bold">Descripción:</th>
          <td>{{ event.description }}</td>
        </tr>
        <tr v-if="author">
          <th class="font-bold">Creado por:</th>
          <td>
            {{ author.name }} &nbsp; &centerdot; &nbsp;
            <a :href="`mailto:${author.email}`">{{ author.email }}</a>
          </td>
        </tr>
        <tr v-if="subscribers.length">
          <th class="font-bold">Subscriptores:</th>
          <td>
            <ul>
              <li class="pico-color-pink-350" v-for="user in subscribers" :key="user.uid">
                {{ user.name }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script setup>
import { db } from '@/firebase'
import { useAuthStore } from '@/stores/counter'
import { useModal } from '@/stores/modal'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const userStore = useAuthStore()
const modalStore = useModal()

const event = ref({})
const author = ref(null)
const loading = ref(false)
const subscribers = ref([])

let eventDocRef = null
let unSubDoc = null

onMounted(async () => {
  loading.value = true
  eventDocRef = doc(db, 'events', route.params.id)
  unSubDoc = onSnapshot(eventDocRef, async (eventDoc) => {
    try {
      loading.value = true
      event.value = eventDoc.data()
      if (!author.value  && event.value.user_uid) {
        author.value = (await getDoc(doc(db, 'users', event.value.user_uid))).data()
      }
      if (event.value.subscribers) {
        const q = query(collection(db, 'users'), where('uid', 'in', event.value.subscribers));

        (await getDocs(q)).forEach((userDoc) => {
          subscribers.value.push(userDoc.data())
        })
      }
    } catch (e) {
      modalStore.alert(e, 'Error')
    } finally {
      loading.value = false
    }
  })
})

const subscribe = async () => {
  const ev = event.value
  if (!ev.subscribers) {
    ev.subscribers = []
  }
  ev.subscribers.push(userStore.user.uid)

  await setDoc(eventDocRef, ev)

  modalStore.alert('Ya estas subscrito a este evento 🥳🥳🥳🥳', 'Subriscrito')
}

onUnmounted(() => {
  unSubDoc()
})
</script>
