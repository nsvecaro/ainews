<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="headerClass">
      <q-toolbar>
        <q-toolbar-title class="title">
          <a href="#/" class="home-link">
            <img :src="logoSrc" width="6%">
          </a>
        </q-toolbar-title>

        <div class="toolbar-links">
          <a href="#/forum" class="toolbar-link1">Forum</a>
          <a href="#/login" class="toolbar-link2">Sign in</a>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, ref, onMounted, onUnmounted } from 'vue'

//scroll check
const route = useRoute()
const isScrolled = ref(false)

//pracenje scrolla
const handleScroll = () => {
  isScrolled.value = window.scrollY > window.innerHeight
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

//dynamic header
const headerClass = computed(() => {
  if (route.path === '/') {
    return isScrolled.value ? 'header header-white' : 'header header-blue'
  }
  return 'header header-white'
})

//logo change
const logoSrc = computed(() => {
  if (route.path === '/') {
    return isScrolled.value
      ? '/src/assets/ainewslogoblack.png'
      : '/src/assets/ainewslogo.png'
  }
  return '/src/assets/ainewslogoblack.png'
})
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