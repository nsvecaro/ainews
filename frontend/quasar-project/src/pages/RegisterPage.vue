<template>
  <q-page class="register-page">
    <div class="register-box">
      <div class="titlesign">Create an account<p>Enter your account details below</p></div>
      <q-form @submit="onRegister">
        <q-input
          v-model="username"
          label="Username"
          type="text"
          dense
          :rules="[val => !!val || 'Username is required']"
          class="q-mb-md"
        />

        <q-input
          v-model="email"
          label="Email"
          type="email"
          dense
          :rules="[
            val => !!val || 'Email is required',
            val => /.+@.+\..+/.test(val) || 'Enter a valid email'
          ]"
          class="q-mb-md"
        />

        <q-input
          v-model="password"
          label="Password"
          type="password"
          dense
          :rules="[val => !!val || 'Password is required']"
          class="q-mb-md"
        />

        <q-input
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          dense
          :rules="[
            val => !!val || 'Please confirm your password',
            val => val === password || 'Passwords do not match'
          ]"
          class="q-mb-md"
        />

        <div class="text-center">
          <q-btn label="Register" color="primary" type="submit" class="register-btn" />
        </div>
      </q-form>
      <div class="registerlink"><a href="#/login">Already have an account? Sign in</a></div>
    </div>
    <Footer />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import Footer from '/src/pages/FooterPage.vue';

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

async function onRegister(event) {
  event.preventDefault();

  if (isFormValid.value) {
    try {
      const response = await fetch('http://localhost:3000/api/korisnik', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          lozinka: password.value, 
          uloga: 'Guest', 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        
        // Resetiranje forme nakon uspješne reg
        username.value = '';
        email.value = '';
        password.value = '';
        confirmPassword.value = '';
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Greška prilikom registracije:', error);
      alert('Greška pri povezivanju s API-jem.');
    }
  } else {
    alert('Molimo popunite sva polja ispravno.');
  }
}
</script>

<style>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(241, 241, 241);
  padding: 0;
}

.q-form {
  width: 400px;
}

.registerlink {
  border-top: 1px solid rgba(0, 0, 0, 0.143);
  width: 400px;
  margin-top: 30px;
  padding-top: 30px;
}

.registerlink a {
  text-decoration: underline;
  color: black;
}

.register-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #db0c0c00;
  border-radius: 50px;
  margin: 0;
  padding: 100px 70px 200px 70px;
}

.titlesign {
  font-size: 26px;
  font-weight: 525;
  text-align: left;
  align-self: left;
  width: 400px;
  margin-bottom: 30px;
}

.titlesign p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
}

.register-btn {
  border-radius: 0px;
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: rgb(0, 0, 0) !important;
}

.register-btn:hover {
  background-color: rgb(50, 50, 50) !important;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}
</style>