<template>
  <q-page class="login-page">
    <div class="login-box">
      <div class="titlesign">
        Sign in to AINews
        <p>Enter your account details below</p>
      </div>
      <q-form @submit="onLogin">
        <q-input
          v-model="username"
          label="Username"
          type="text"
          dense
          :rules="[val => !!val || 'Username is required']"
          class="q-mb-md"
        />
        <q-input
          v-model="lozinka"
          label="Password"
          type="password"
          dense
          :rules="[val => !!val || 'Password is required']"
          class="q-mb-md"
        />
        <div class="text-center">
          <q-btn label="Login" color="primary" type="submit" class="login-btn" />
        </div>
      </q-form>
      <div class="registerlink">
        <a href="#/register">Don't have an account?</a>
      </div>
    </div>
    <Footer />
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const lozinka = ref("");
const router = useRouter();

async function onLogin(event) {
  event.preventDefault();

  if (username.value && lozinka.value) {
    try {
      const response = await fetch("http://localhost:3000/api/korisnik/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          lozinka: lozinka.value,
        }),
        credentials: "include", // Ovo omogućava slanje kolačića
      });

      const data = await response.json();

      if (response.ok) {
        // Pohrana podataka u localStorage
        localStorage.setItem("username", data.korisnikIme);
        localStorage.setItem("uloga", data.uloga);
        localStorage.setItem("userId", data.userId); // Dodano - pohrana userId-a

        alert(`Welcome, ${data.korisnikIme}`);

        // Redirekcija prema ulozi
        if (data.uloga === "Admin") {
          router.push("/admin");
        } else if (data.uloga === "User") {
          router.push("/user");
        } else {
          alert("Nepoznata uloga, molimo kontaktirajte podršku.");
        }
      } else {
        alert(`Greška prilikom prijave: ${data.message}`);
      }
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do pogreške. Pokušajte ponovno.");
    }
  }
}


</script>


<style>
.login-page {
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

.login-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
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

.login-btn {
  border-radius: 0px;
  width: 100%;
  padding: 10px 20px;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: rgb(0, 0, 0) !important;
}
</style>
