<template>
  <q-page class="flex flex-center login-page">
    <div style="width: 100%; max-width: 400px; padding: 20px;">
      <div class="text-h5 text-center q-mb-md">Login</div>
      
      <q-form @submit="onLogin">
        <q-input
          filled
          v-model="username"
          label="Username"
          type="text"
          dense
          clearable
          :rules="[val => !!val || 'Username is required']"
          class="q-mb-md"
        />
        
        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          dense
          clearable
          :rules="[val => !!val || 'Password is required']"
          class="q-mb-md"
        />
        
        <div class="text-center">
          <q-btn
            label="Login"
            color="primary"
            type="submit"
            :disable="!username || !password"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')

function onLogin() {
  
  if (username.value && password.value) {
    console.log('Logging in with:', { username: username.value, password: password.value })

    // Resetiranje polja nakon prijave korisnika
    username.value = ''
    password.value = ''
    alert('Login successful!')
  }
}
</script>

<style>
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5; 
  padding: 20px;
}
</style>
