<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link">AINews</a>
        </q-toolbar-title>
        
        <div class="toolbar-links">
          <a href="#/forum" class="toolbar-link">Forum</a><br>
          <a href="#/login" class="toolbar-link">Login</a>|
          <a href="#/register" class="toolbar-link">Register</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.header {
  background-color: rgb(0, 98, 255);
  box-shadow: none !important;
  border-bottom: 1px solid rgb(0, 98, 255);
  height: 100px;
  align-items: center;
  display: flex;
}

.title {
  margin-left: 170px;
  text-align: left;
  flex: 1; /*Guranje elementa desno*/
  font-size: 20px;
  font-weight: bold;
}

/* Stil za linkove */
.toolbar-links {
  display: flex;
  gap: 20px; /* Razmak između linkova */
  align-items: center;
  margin-right: 170px;
}

.toolbar-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 16px;
}

.toolbar-link:hover {
  text-decoration: underline;
}

.home-link {
  text-decoration: none;
  color: #ffffff;
  font-size: 30px;
  font-weight: bold;
  text-align: left;

}

.home-link:hover {
  text-decoration: none;
}
</style>