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
    <div class="footer">

      <div class="footerinfo">
        <h3>AI NEWS</h3>
        <p>All rights reserved by AINews &#169;</p>
      </div>
        <div class="socialmedia">
          <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Instagram</a>
          <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Facebook</a>
          <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">X</a>
  </div>

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

.footer{
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
.footerinfo{
  flex: 1;
  text-align: left;
  margin-left: 170px;
}

.footerinfo h3, .footerinfo p{
  margin: 5px 0;
}

.socialmedia{
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}
.socialmedia a{
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}
.socialmedia a:hover {
  text-decoration: underline;
}
.socialmedia a img{
  margin-right: 10px;
} 

</style>