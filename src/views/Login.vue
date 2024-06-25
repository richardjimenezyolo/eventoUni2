<template>
  <form @submit.prevent="save">
    <article>
      <header>
        <h3>Login</h3>
      </header>
      <input
        v-model="form.email"
        type="email"
        placeholder="Email"
        aria-label="Email"
        autocomplete="email"
      />
      <input v-model="form.password" type="password" placeholder="Password" aria-label="Password" />
      <footer class="flex justify-end items-center gap-2">
        <a v-if="!route.query.new" @click="router.replace({ query: { new: true } })">
          No tengo cuenta
        </a>
        <router-link v-else to="/login">ya tengo cuenta</router-link>
        <button :aria-busy="loading" class="secondary">cancelar</button>
        <button :aria-busy="loading">Login</button>
      </footer>
    </article>
  </form>
  <pre>
    {{ form }}
  </pre>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const loading = ref(false)

const form = ref({
  email: '',
  password: ''
})

const save = async () => {
  loading.value = true
  const { email, password: pwd } = form.value

  try {
    if (route.query.new) {
      const userCred = await createUserWithEmailAndPassword(auth, email, pwd)

      router.push('/')
      return
    }

    const userCred = await signInWithEmailAndPassword(auth, email, pwd)
    router.push('/')
  } catch (e) {
    alert(e)
  }

  loading.value = false
}
</script>
