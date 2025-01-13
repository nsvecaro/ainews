<template>
    <q-page>
      <div class="change-username-container">
        <h2>Change Username</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="new-username">New Username</label>
            <input v-model="newUsername" type="text" id="new-username" required />
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
        newUsername: "",
      };
    },
    methods: {
      submitForm() {
        // Ovdje dodaj logiku za promjenu korisničkog imena (API poziv)
        console.log("New Username:", this.newUsername);
        // Na temelju korisničkog imena, možeš poslati API zahtjev na backend
      },
    },
  };
  </script>
  
  <style scoped>
  /* Dodaj svoj CSS prema potrebama */
  .change-username-container {
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
  