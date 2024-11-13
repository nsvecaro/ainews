<template>
  <q-page class="flex flex-center">
    <!-- Plavi dio stranice-->
    <div class="front-page">
      <div class="content">
        <h1>AINews Updates</h1>
      </div>
    </div>

    <!-- Main content-->
    <div class="main-content">
      <h2>Main Media</h2>
      <p></p>
    </div>

    <div class="extra-space"></div> <!-- Samo za pregled stranice kako bi mogao biti-->
    <!-- FOOTER -->
    <div class="copyright">
      <h3>AI NEWS</h3>
      <p>All rights reserved by AINews &#169;</p>
     <!-- <div class="socialmedia">
        <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="5%">&#160;</a>
        <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="5%">&#160;</a>
        <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="5%">&#160;</a>
        <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="5%">&#160;</a>
      </div>--> 

    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const scrolled = ref(false);

function handleScroll() {
  if (window.scrollY > 10) {
    scrolled.value = true;
  } else {
    scrolled.value = false;
  }
} 

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.front-page {
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 98, 255);
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content {
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.extra-space {
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255); 
}

.copyright {
  width: 100%;
  height: 150px;
  background-color: black;
  color: white;
  display: flex; /* Div -> Flex */
  flex-direction: column; /* Vertikalni smjer */
  justify-content: center; /* Centriranje vertikalno */
  align-items: left; /* Centriranje horizontalno */
  text-align: left; 
}

.copyright h3, .copyright p {
  margin: 2px;
}

/* .socialmedia{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.socialmedia a{
  margin: 10px;
} */

</style>
