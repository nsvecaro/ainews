<template>
  <q-page>
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

<div class="footer">

<div class="footerinfo">
  <h3>AI NEWS</h3>
  <p>All rights reserved by AINews &#169;</p>
</div>
<div class="socialmedia">
  <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Instagram</a>
  <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Facebook</a>
  <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">X</a>
</div>

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

.footer{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: black;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;

}
.footerinfo{
  flex: 1;
  text-align: left;
  margin-left: 170px;
}

.footerinfo h3, .footerinfo p{
  margin: 5px 0;
}

.socialmedia{
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}
.socialmedia a{
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}
.socialmedia a:hover {
  text-decoration: underline;
}
.socialmedia a img{
  margin-right: 10px;
} 
</style>
