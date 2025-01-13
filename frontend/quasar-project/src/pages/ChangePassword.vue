<template>
    <q-page>
      <div class="change-password-container">
        <h2>Change Password</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="old-password">Old Password</label>
            <input v-model="oldPassword" type="password" id="old-password" required />
          </div>
          <div class="form-group">
            <label for="new-password">New Password</label>
            <input v-model="newPassword" type="password" id="new-password" required />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        oldPassword: "",
        newPassword: "",
      };
    },
    methods: {
      submitForm() {
        // Ovdje dodaj logiku za promjenu lozinke (API poziv)
        console.log("Old Password:", this.oldPassword);
        console.log("New Password:", this.newPassword);
        // Na temelju lozinki, možeš poslati API zahtjev na backend
      },
    },
  };
  </script>
  
  <style scoped>
  /* Dodaj svoj CSS prema potrebama */
  .change-password-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
  }
  .form-group {
    margin-bottom: 10px;
  }
  label {
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
  }
  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  