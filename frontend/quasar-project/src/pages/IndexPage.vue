<template>
  <q-page class="flex flex-center">
    <!-- Plavi dio stranice-->
    <div class="front-page">
      <div class="content">
        <div class="slideshow">
          <div class="new-button">
            New
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores dolor, sint accusamus libero neque itaque
            omnis? Possimus, porro iure amet repudiandae ex a vero! Minus facere nesciunt eaque sint repudiandae.

          </p>

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
  width: 45%;
  background: #ffffff;
  border-top: 8px solid #FF8C00;
  padding: 40px;
  margin: -20px 80px 50px 300px;
  height: 500px;
}

.slideshow p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555555;
}

.new-button {
  /* 'NEW' u slideshow boxu */
  display: flex;
  background-color: #000000;
  margin-top: 0px;
  margin-bottom: 50px;
  font-size: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  color: #ffffff;
  width: 45px;
  height: 35px;
  padding: 5px 10px;
  ;

  box-shadow: 5px 5px 0 0 #FF8C00, 5px 5px 0 0 #FF8C00;
}

.forum-page {
  width: auto;
  height: 60%;
  background-color: #00000000;
  border: 3px solid #FF8C00;
  margin: -20px 300px 20px 80px
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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