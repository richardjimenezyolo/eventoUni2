<template>
  <nav>
    <ul>
      <li><strong>Eventos Uni</strong></li>
    </ul>
    <ul>
      <li>
        <p v-if="authStore.user">{{ authStore.user.email }}</p>
        <a v-else href="/login">Log in</a>
      </li>
    </ul>
  </nav>

  <div class="pb-5"></div>

  <RouterView />
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useAuthStore } from './stores/counter'

const authStore = useAuthStore()

onAuthStateChanged(auth, (user) => {
  console.log(user)
  authStore.user = user
})
</script>
