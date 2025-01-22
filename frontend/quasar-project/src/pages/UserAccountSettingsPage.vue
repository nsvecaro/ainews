<template>
  <q-page class="settings-page">
    <div class="settings-box">
      <div class="titlesign">
        Account Settings
        <p>Manage your account details below</p>
      </div>
      <div class="settings-options">
        <q-btn
          label="Change Username"
          color="primary"
          flat
          class="settings-btn"
          @click="navigateTo('/user/accountsettings/change-username')"
        />
        <q-btn
          label="Change Password"
          color="primary"
          flat
          class="settings-btn"
          @click="navigateTo('/user/accountsettings/change-password')"
        />
        <q-btn
          label="Logout"
          color="negative"
          flat
          class="settings-btn"
          @click="onLogout"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();


function navigateTo(route) {
  router.push(route);
}

async function onLogout() {
  try {
    const response = await fetch("http://localhost:3000/api/korisnik/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      localStorage.clear();
      alert("Successfully logged out!");
      router.push("/login");
    } else {
      alert("Error logging out.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Please try again.");
  }
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(241, 241, 241);
  padding: 0;
}

.settings-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.titlesign {
  font-size: 26px;
  font-weight: 525;
  text-align: center;
  width: 100%;
  margin-bottom: 30px;
}

.titlesign p {
  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  color: gray;
}

.settings-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.settings-btn {
  width: 100%;
  font-size: 16px;
  text-transform: none;
  background-color: rgb(241, 241, 241);
  transition: all 0.3s ease;
}

.settings-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.settings-btn.q-btn--flat:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>