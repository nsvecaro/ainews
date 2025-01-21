<template>
  <q-page class="login-page">
    <div class="login-box">
      <div class="titlesign">
        Change Password
        <p>Enter your current password and the new password below</p>
      </div>
      <q-form @submit.prevent="submitForm">
        <q-input
          v-model="oldPassword"
          label="Current Password"
          type="password"
          dense
          :rules="[val => !!val || 'Current password is required']"
          class="q-mb-md"
        />
        <q-input
          v-model="newPassword"
          label="New Password"
          type="password"
          dense
          :rules="[val => !!val || 'New password is required']"
          class="q-mb-md"
        />
        <q-input
          v-model="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          dense
          :rules="[val => !!val || 'Please confirm your new password']"
          class="q-mb-md"
        />
        <div class="text-center">
          <q-btn label="Submit" color="primary" type="submit" class="login-btn" />
        </div>
      </q-form>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      error: null,
      success: null,
    };
  },
  methods: {
    async submitForm() {
      try {
        this.error = null;
        this.success = null;

        // Check if newPassword matches confirmNewPassword
        if (this.newPassword !== this.confirmNewPassword) {
          this.error = "New password and confirmation do not match.";
          return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
          this.error = "User not logged in.";
          return;
        }

        const response = await axios.put(
          `http://localhost:3000/api/korisnik/${userId}/password`,
          {
            currentPassword: this.oldPassword,
            newPassword: this.newPassword,
          },
          { withCredentials: true }
        );

        this.success = response.data.message;
        this.logout();
      } catch (err) {
        this.error = err.response?.data?.message || "An error occurred.";
      }
    },
    async logout() {
      try {
        await axios.post("http://localhost:3000/api/korisnik/logout", {}, { withCredentials: true });

        localStorage.clear();
        alert("Password changed successfully. Please log in again.");
        this.$router.push("/login");
      } catch (error) {
        console.error("Error during logout:", error);
        this.error = "An error occurred while logging out.";
      }
    },
  },
};
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

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>