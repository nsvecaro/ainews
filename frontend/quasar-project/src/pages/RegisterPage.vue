<template>
  <q-page class="register-page">
    <div class="register-container">
      <div class="register-header text-h5 text-center q-mb-md">Create an Account</div>

      <div class="register-box">
        <q-form @submit="onRegister">
         
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
            v-model="email"
            label="Email"
            type="email"
            dense
            clearable
            :rules="[
              val => !!val || 'Email is required',
              val => /.+@.+\..+/.test(val) || 'Enter a valid email address'
            ]"
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

          <!-- Potvrda lozinke -->
          <q-input
            filled
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            dense
            clearable
            :rules="[
              val => !!val || 'Please confirm your password',
              val => val === password || 'Passwords must match'
            ]"
            class="q-mb-md"
          />

          <!--gumb za registraciju-->
          <div class="text-center">
            <q-btn
              label="Register"
              color="primary"
              type="submit"
              :disable="!isFormValid"
              class="register-btn"
            />
          </div>
        </q-form>
      </div>
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
import { ref, computed } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');


const isFormValid = computed(() => {
  return (
    username.value &&
    email.value &&
    /.+@.+\..+/.test(email.value) &&
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

function onRegister(event) {
  event.preventDefault(); 

  if (isFormValid.value) {
    alert('Register successful!'); 

    console.log('Registering with:', {
      username: username.value,
      email: email.value,
      password: password.value,
    });

   
    username.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
  } else {
    alert('Please fill out the form correctly.');
  }
}
</script>

<style>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0;
  box-sizing: border-box;
}

.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 20px;
}

.register-header {
  margin-top: 50px;
  margin-bottom: 1px; 
}

.register-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #ffffff00;
  border-radius: 50px;
  margin: 0;
  flex-grow: 1;
}

.register-btn {
  border-radius: 65px;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: rgb(0, 98, 255);
}

.register-btn:hover {
  background-color: rgb(0, 98, 255);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.register-btn:disabled {
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
  margin-top: 40px; 
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
