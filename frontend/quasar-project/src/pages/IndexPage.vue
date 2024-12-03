<template>
  <q-page class="flex flex-center">
    <!-- Plavi dio stranice-->
    <div class="front-page">
      <div class="content">
        <div class="slideshow">
          <div class="new-button">New</div>
          <p>Alibaba Marco-o1: Advancing LLM reasoning capabilities. HOW IS THIS POSSIBLE?</p>
         <img src="/src/assets/test.png">
        </div>
        <div class="forum-page">
          <h3>Forum Discussion</h3>
          <ul>
            <li><img src="/src/assets/openailogo.svg" width=20px> &nbsp;OpenAI</li>
            <li><img src="/src/assets/geminilogo.png" width="20px"> &nbsp;Gemini</li>
            <li><img src="/src/assets/alphagologo.png" width=20px> &nbsp;AlphaGO</li>
            <li><img src="/src/assets/ibmlogo.png" width=20px> &nbsp;Watson (IBM)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main content-->
    <div class="main-content">

      <div class="newsbox">
        <NewsSlideshow />
      </div>
    </div>
    <div class="theme-bar">
      <ul class="theme-bar-links">
        <li><a href="www.openai.com">OpenAi</a></li>
        <li><a href="www.google.com">Google</a></li>
        <li><a href="www.blackbox.com">Blackbox</a></li>
        <li><a href="www.ibm.com">IBM</a></li>
      </ul>

    </div>
  <div class="news-list-main">
    <div class="news-list">
      <div class="news-grid">
      <div class="news">News 1</div>
      <div class="news">News 2</div>
      <div class="news">News 3</div>
      <div class="news">News 4</div>
      </div>
    </div>
  </div>
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
import NewsSlideshow from '/src/pages/NewsSlideshow.vue';  /* Importanje stranice NewsSlideshow */
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
/*.front-page {
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 98, 255);
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}
*/

/* Redosljed css-a po redu */

/* Main blue box */
.front-page {
  width: 100%;
  background-color: rgb(0, 98, 255);
  color: rgb(255, 255, 255);
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.content {
  /* Box u kojem su slideshow i forum page */
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 600px;
}


.slideshow {
  width: 35%;
  background: #ffffff;
  border-top: 8px solid #FF8C00;
  padding: 40px;
  margin: -50px 80px 50px 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.slideshow p{
  margin-top: -25px;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.2;
  color: #000000;
}


.new-button {
  /* 'NEW' u slideshow boxu */
  display: flex;
  background-color: #000000;
  margin-top: 0px;
  font-size: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #ffffff;
  width: 45px;
  height: 35px;
  padding: 5px 10px;

  box-shadow: 5px 5px 0 0 #FF8C00, 5px 5px 0 0 #FF8C00;
}

.forum-page {
  width: auto;
  height: 60%;
  background-color: #00000000;
  border: 3px solid #FF8C00;
  margin: -50px 300px 20px 80px;
}

.forum-page h3 {
  font-size: 40px;
  margin: 20px 15px 20px 15px;
}

.forum-page ul {
  padding: 5px;
  margin-left: 15px;
  font-size: 15px;
}

.forum-page li {
  list-style-type: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

}

.forum-page li img {
  margin-right: 10px;
}

/* MainContent koji sadrzi NewsSlideshow.vue */
.main-content {
  width: 100%;
  background-color: rgb(224, 224, 224);
  padding: 20px;
  height: 100vh;
  display: flex;      /* flex div */
  flex-direction: column; /* svrstavanje u vertikalno */
  align-items: center; /* align center */
  justify-content: center; /*  */
}

.theme-bar{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(0, 98, 255);
  padding: 20px;
  font-size: 22px;
  color: white;
}

.theme-bar-links{
  list-style: none;
  padding: 0px;
  margin: 0px;
  align-items: center;

}

.theme-bar-links li{
  display: inline-block;
  margin-right: 20px;
}

.theme-bar-links a {
  text-decoration: none;
  color: white;
}

.theme-bar-links a:hover {
  text-decoration: underline;
}

.news-list-main{
  background-color: rgb(224, 224, 224);
  width: 100%;
  padding: 50px 0;
}

.news-list{
  max-width: calc(100%-600px);
  margin: 50px 300px 50px 300px;
  padding: 20px;
}

.news-grid{
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 30px;
}

.news{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff76;
  height: 200px;
}



/* - - - - - */
/* FOOTER CSS */

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

.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}

.socialmedia a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.socialmedia a:hover {
  text-decoration: underline;
}

.socialmedia a img {
  margin-right: 10px;
}
</style>