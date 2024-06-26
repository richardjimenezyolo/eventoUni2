<template>
  <form class="lg:w-2/3 lg:mx-auto" @submit.prevent="save">
    <article>
      <header>
        <h3 v-if="route.query.new">Sign in</h3>
        <h3 v-else>Login</h3>
      </header>
      <input v-if="route.query.new" v-model="form.name" required type="text" placeholder="Nombre" />
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
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { useRoute, useRouter } from 'vue-router'
import { useModal } from '@/stores/modal'
import { doc, setDoc } from 'firebase/firestore'

const router = useRouter()
const route = useRoute()
const modalStore = useModal()

const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  name: ''
})

const save = async () => {
  loading.value = true
  const { email, password: pwd } = form.value

  try {
    if (route.query.new) {
      const userCred = await createUserWithEmailAndPassword(auth, email, pwd)

      await setDoc(doc(db, 'users', userCred.user.uid), {
        uid: userCred.user.uid,
        email: userCred.user.email,
        name: form.value.name
      })

      await router.push('/')
      return
    }

    const userCred = await signInWithEmailAndPassword(auth, email, pwd)
    modalStore.alert('Sesión iniciada 🥳🥳🥳🥳', 'Sesión iniciada')
    router.push('/')
  } catch (e) {
    console.dir(e)
    modalStore.alert(e, 'error')
  }

  loading.value = false
}
</script>
