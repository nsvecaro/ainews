<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link"><img src="/src/assets/ainewslogo.png" width="7%"></a>
        </q-toolbar-title>
        
        <div class="toolbar-links">
          <a href="#/forum" class="toolbar-link">Forum</a>
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
  margin-left: 300px;
  margin-top: 10px;
  text-align: left;
  flex: 1; /*Guranje elementa desno*/
  font-size: 20px;
  font-weight: bold;
}



/* linkovi */
.toolbar-links {
  display: flex;
  gap: 10px; /* Razmak izmedu linkova */
  align-items: center;
  margin-right: 300px;

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
  align-items: center;
}

.home-link:hover {
  text-decoration: none;
}
</style>