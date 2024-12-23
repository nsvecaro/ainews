<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link"><img src="/src/assets/ainewslogo.png" width="7%"></a>
        </q-toolbar-title>

        <div class="toolbar-links">
          <a href="#/forum" class="toolbar-link">Forum</a>
          <q-btn flat icon="person" class="profile-icon" @click="toggleProfileMenu" />
          <span class="username">{{ username }}</span>

          <q-menu
            v-if="showProfileMenu"
            anchor="bottom right"
            self="bottom left"
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>My Comments</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Change Username</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      username: 'Current Username', // Ovo treba biti povezano sa trenutnim korisnikom
      showProfileMenu: false,
    };
  },
  methods: {
    toggleProfileMenu() {
      this.showProfileMenu = !this.showProfileMenu;
    }
  },
};
</script>







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
  flex: 1;
  font-size: 20px;
  font-weight: bold;
}

.toolbar-links {
  display: flex;
  gap: 10px;
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
}

.home-link:hover {
  text-decoration: none;
}

.profile-icon {
  margin-left: 10px;
  cursor: pointer;
}

.username {
  margin-left: 5px;
  color: #ffffff;
}
</style>
