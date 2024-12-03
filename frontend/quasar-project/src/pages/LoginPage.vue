<template>
  <q-page class="login-page">
    <div class="login-box">
      <div class="text-h5 text-center q-mb-md">Enter credentials</div>

      <q-form @submit="onLogin">
        <q-input
          filled
          v-model="username"
          label="Username"
          type="text"
          dense
          :rules="[val => !!val || 'Username is required']"
          class="q-mb-md"
        />

        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          dense
          :rules="[val => !!val || 'Password is required']"
          class="q-mb-md"
        />

        <div class="text-center">
          <q-btn
            label="Login"
            color="primary"
            type="submit"
            :disable="!username || !password"
            class="login-btn"
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
        <a href="www.instagram.com"
          ><img src="/src/assets/igIcon.png" alt="Instagram" width="20px" />Instagram</a
        >
        <a href="www.instagram.com"
          ><img src="/src/assets/igIcon.png" alt="Instagram" width="20px" />Facebook</a
        >
        <a href="www.instagram.com"
          ><img src="/src/assets/igIcon.png" alt="Instagram" width="20px" />X</a
        >
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref(''); 

function onLogin(event) {
  event.preventDefault(); // Sprječava ponovno učitavanje stranice

  if (username.value && password.value) {
    console.log('Logging in with:', {
      username: username.value,
      password: password.value,
    });

    // Prazni polja nakon što korisnik pritisne login
    username.value = '';
    password.value = '';
    alert('Login successful!');
  }
}
</script>

<style>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 200vh;
  background-color: #f5f5f5;
  padding: 0;
  box-sizing: border-box;
}

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #db0c0c00;
  border-radius: 50px;
  margin: 0;
  flex-grow: 1;
  height: 70vh;
}

.login-btn {
  border-radius: 65px;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: rgb(0, 98, 255);
}

.login-btn:hover {
  background-color: rgb(0, 98, 255);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.login-btn:disabled {
  background-color: #d1d5db;
  color: #9ca3af;
  box-shadow: none;
  cursor: not-allowed;
}

.footer {
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

.footerinfo {
  flex: 1;
  text-align: left;
  margin-left: 170px;
}

.footerinfo h3,
.footerinfo p {
  margin: 5px 0;
}

.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}

.socialmedia a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.socialmedia a:hover {
  text-decoration: underline;
}

.socialmedia a img {
  margin-right: 10px;
}
</style>