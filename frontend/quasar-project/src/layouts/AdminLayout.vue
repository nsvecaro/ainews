<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="headerClass">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link">
            <img :src="logoSrc" width="10.9%" />
          </a>
        </q-toolbar-title>

        <div class="toolbar-links">
          <a href="#/admin/forum" class="toolbar-link">Forum</a>
          <router-link to="/admin/createnew" class="toolbar-link">CREATE NEW</router-link>
          <span class="username">{{ username }}</span> 
          <q-btn flat icon="person" class="profile-icon" @click="toggleProfileMenu" /> 

          <q-menu v-if="showProfileMenu" anchor="bottom right" self="bottom left">
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>Logout</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/admin/accountsettings"> 
                <q-item-section>Account Settings</q-item-section>
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

<script setup>
import { ref } from 'vue'

const username = 'Current Username'; // Replace with dynamic username
const showProfileMenu = ref(false);

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

// Scroll logic
import { computed, onMounted, onUnmounted } from 'vue';
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const headerClass = computed(() => {
  return isScrolled.value ? 'header header-white' : 'header header-blue';
});

const logoSrc = computed(() => {
  return isScrolled.value ? '/src/assets/ainewslogoblack.png' : '/src/assets/ainewslogo.png';
});
</script>

<style scoped>
.header {
  box-shadow: none !important;
  border-bottom: 1px solid transparent;
  height: 100px;
  align-items: center;
  display: flex;
  transition: background-color 0.3s ease, border-bottom 0.3s ease;
}

.header-blue {
  background-color: rgb(0, 98, 255);
  border-bottom: 1px solid rgb(0, 98, 255);
}

.header-white {
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
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