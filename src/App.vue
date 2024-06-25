<template>
  <nav>
    <ul>
      <li>
        <a href="/"><h2>Eventos Uni</h2></a>
      </li>
    </ul>
    <ul>
      <li>
        <span v-if="authStore.user">{{ authStore.user.email }}</span>
        <a v-else href="/login">Log in</a>
      </li>
      <li>
        <button @click="router.push('events/form')">Nuevo Evento</button>
      </li>
      <li>
        <details class="dropdown">
          <summary>🌓</summary>
          <ul>
            <li><a @click="changeTheme('dark')">Dark</a></li>
            <li><a @click="changeTheme('light')">Light</a></li>
          </ul>
        </details>
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
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

onAuthStateChanged(auth, (user) => {
  console.log(user)
  authStore.user = user
})

const changeTheme = (theme) => {
  document.querySelector('html').setAttribute('data-theme', theme)
}
</script>
