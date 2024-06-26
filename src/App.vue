<template>
  <nav>
    <ul>
      <li>
        <!-- <a href="/"></a> -->
        <RouterLink to="/">
          <h2 class="pico-color-pink-500 m-0">Eventos Uni</h2>
        </RouterLink>
      </li>
    </ul>
    <ul>
      <li>
        <details v-if="authStore.user" class="dropdown">
          <summary>{{ authStore.user.email }}</summary>
          <ul class="cursor-pointer">
            <li>
              <RouterLink to="/events/form">Nuevo Evento</RouterLink>
            </li>
            <li><a @click="changeTheme('light')">☀️ Tema claro</a></li>
            <li><a @click="changeTheme('dark')">🌑 Tema oscuro</a></li>
            <li>
              <a @click="logOut">Log out</a>
            </li>
          </ul>
        </details>
        <!-- <a v-else href="/login">Log in</a> -->
        <RouterLink v-else to="/login">Log in</RouterLink>
      </li>
    </ul>
  </nav>
  <hr />

  <RouterView />

  <dialog :open="modalStore.modal.show">
    <article>
      <header>
        <button aria-label="Close" rel="prev" @click="modalStore.close"></button>
        <p>
          <strong>&nbsp; {{ modalStore.modal.type }}</strong>
        </p>
      </header>
      <p>
        {{ modalStore.modal.message }}
      </p>
    </article>
  </dialog>
</template>

<script setup>
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useAuthStore } from './stores/counter'
import { useRouter } from 'vue-router'
import { useModal } from './stores/modal'

const router = useRouter()
const authStore = useAuthStore()
const modalStore = useModal()

onAuthStateChanged(auth, (user) => {
  console.log(user)
  authStore.user = user
})

const changeTheme = (theme) => {
  document.querySelector('html').setAttribute('data-theme', theme)
}

const logOut = async () => {
  await signOut(auth)
  modalStore.alert('sesión cerrada exitosamente')
}
</script>
