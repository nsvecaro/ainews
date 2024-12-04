<template>
  <q-page class="register-page">
    <div class="register-container">
      <div class="register-header text-h5 text-center q-mb-md">Registrirajte se</div>
      <div class="register-box">
        <q-form @submit="onRegister">
          <q-input filled v-model="username" label="Korisničko ime" type="text" dense clearable
            :rules="[val => !!val || 'Korisničko ime je obavezno']" class="q-mb-md" />

          <q-input filled v-model="email" label="Email" type="email" dense clearable :rules="[
            val => !!val || 'Email je obavezan',
            val => /.+@.+\..+/.test(val) || 'Unesite ispravan email'
          ]" class="q-mb-md" />

          <q-input filled v-model="password" label="Lozinka" type="password" dense clearable
            :rules="[val => !!val || 'Lozinka je obavezna']" class="q-mb-md" />

          <q-input filled v-model="confirmPassword" label="Potvrda lozinke" type="password" dense clearable :rules="[
            val => !!val || 'Potvrdite lozinku',
            val => val === password || 'Lozinke se ne podudaraju'
          ]" class="q-mb-md" />

          <div class="text-center">
            <q-btn label="Registracija" color="primary" type="submit" :disable="!isFormValid" class="register-btn" />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

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
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "Server/js",
        },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        username.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Greška prilikom registracije:", error);
      alert("Greška pri povezivanju s API-jem.");
    }
  } else {
    alert("Molimo popunite sva polja ispravno.");
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
