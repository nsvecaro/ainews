<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="headerClass">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link">
            <img :src="logoSrc" width="7%" />
          </a>
        </q-toolbar-title>

        <div class="toolbar-links">
          <a href="#/admin/forum" class="toolbar-link1">Forum</a>
          <a href="#/admin/createnew" class="toolbar-link1">Create New</a>
          <span class="username">{{ username }}</span>
          <q-btn flat icon="person" class="profile-icon" @click="toggleProfileMenu" />
          <q-menu v-if="showProfileMenu" anchor="bottom right" self="bottom left">
            <q-list>
              <q-item clickable v-close-popup @click="logout">
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
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted, onUnmounted } from "vue";

const username = ref(localStorage.getItem("username") || "User"); 
const showProfileMenu = ref(false);
const router = useRouter();


const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});


const route = useRoute();
const headerClass = computed(() => {
  return isScrolled.value ? "header header-white" : "header header-blue";
});

const logoSrc = computed(() => {
  return isScrolled.value
    ? "/src/assets/ainewslogoblack.png"
    : "/src/assets/ainewslogo.png";
});

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value;
};

const logout = async () => {
  try {
    await fetch("http://localhost:3000/api/korisnik/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.clear();
    router.push("/"); 
  } catch (error) {
    console.error("Greška prilikom odjave:", error);
  }
};
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
  margin-right: 310px !important;
}

.toolbar-link1,
.toolbar-link2 {
  text-decoration: none;
  font-size: 16px;
}

.toolbar-link1 {
  color: #ffffff;
}

.toolbar-link2 {
  color: #ffffff;
}

.header-white .toolbar-link1,
.header-white .toolbar-link2 {
  color: #000000;
  
}

.toolbar-link1:hover,
.toolbar-link2:hover {
  text-decoration: underline;
}

.home-link {
  text-decoration: none;
  font-size: 30px;
  font-weight: bold;
  align-items: center;
}
</style>