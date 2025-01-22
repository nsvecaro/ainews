<template>
    <q-page>
      <div class="footer">
        <div class="footerinfo">
          <h3>AI NEWS</h3>
          <p>All rights reserved by AINews &#169;</p>
        </div>
        <div class="user-options">
          <router-link to="/admin/accountsettings/change-username" class="user-option">Change Username</router-link>
          <router-link to="/admin/accountsettings/change-password" class="user-option">Change Password</router-link>
        </div>
      </div>
  
      <!-- Ovdje će se prikazivati sadržaj promjene korisničkog imena ili lozinke -->
      <router-view></router-view>
    </q-page>
  </template>
  
  <script>
  export default {
    name: 'AccountSettingsPage',
  }
  </script>
  
  <style scoped>
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
  
  .user-options {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: left;
    margin-right: 170px;
  }
  
  .user-option {
    text-decoration: none;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: #212121;
  }
  
  .user-option:hover {
    background-color: #333333;
  }
  </style>
  