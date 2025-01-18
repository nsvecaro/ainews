<template>
  <q-page class="flex flex-center">
    <!-- Plavi dio stranice-->
    <div class="front-page">
      <div class="content">
        <div class="slideshow">
          <div class="new-button">New</div>
          <p @click="navigateToNews(latestNews.ID_vijesti)" style="cursor: pointer;">{{ latestNews.naslov }}</p>
          <p class="theme">
          <ul>
            <li>{{ latestNews.tema }}</li>
          </ul>
          </p>
          <img :src="`http://localhost:3000${latestNews.slika_vijesti}`" alt="Slika vijesti" class="slideshow-image"
            @click="navigateToNews(latestNews.ID_vijesti)" style="cursor: pointer;">
        </div>
        <div class="forum-page">
          <p>Top discussions</p>
          <div class="forum-content">
            <ul>
              <li><img src="/src/assets/openailogo.svg" width=20px> &nbsp;OpenAI</li>
              <li><img src="/src/assets/geminilogo.png" width="20px"> &nbsp;Gemini</li>
              <li><img src="/src/assets/alphagologo.png" width=20px> &nbsp;AlphaGO</li>
              <li><img src="/src/assets/ibmlogo.png" width=20px> &nbsp;Watson (IBM)</li>
              <li><img src="/src/assets/ibmlogo.png" width=20px> &nbsp;Watson (IBM)</li>
              <li><img src="/src/assets/ibmlogo.png" width=20px> &nbsp;Watson (IBM)</li>
            </ul>
          </div>
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
          <div v-for="newsItem in newsList" :key="newsItem.ID_vijesti" class="news"
            @click="navigateToNews(newsItem.ID_vijesti)" style="cursor: pointer;">
            <img :src="`http://localhost:3000${newsItem.slika_vijesti}`" alt="Slika vijesti" class="news-image">
            <div class="news-title">
              <p>{{ newsItem.naslov }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FOOTER -->
    <Footer />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import NewsSlideshow from '/src/pages/NewsSlideshow.vue';  //NewsSlideshow
import { useRouter } from 'vue-router';
import Footer from '/src/pages/FooterPage.vue'; //Footer

const latestNews = ref({ naslov: '', slika_vijesti: '' }); // latestNews
const newsList = ref([]);
const router = useRouter();


const navigateToNews = (id) => {
  const role = localStorage.getItem('uloga'); 
  if (role === 'User') {
    router.push(`/user/vijesti/${id}`);
  } else if (role === 'Admin') {
    router.push(`/admin/vijesti/${id}`); 
  } else {
    router.push(`/vijesti/${id}`); 
  }
};


// najnovija vijest
const fetchNews = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/vijesti');
    newsList.value = await Promise.all(
      response.data.map(async (newsItem) => {
        const themeName = await fetchThemeName(newsItem.ID_teme);
        return { ...newsItem, tema: themeName };
      })
    );
    if (newsList.value.length > 0) {
      latestNews.value = newsList.value[0]; 
    }
  } catch (error) {
    console.error('Greška pri dohvaćanju vijesti:', error);
  }
};

const fetchThemeName = async (temaId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/teme/${temaId}`);
    return response.data.Naslov_teme; 
  } catch (error) {
    console.error('Greška pri dohvaćanju teme:', error);
    return 'Nepoznata tema';
  }
};

onMounted(() => {
  fetchNews(); // Poziv za get najnovije vijesti
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
  margin: -50px 100px 50px 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.slideshow p {
  margin-top: -25px;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.2;
  color: #000000;
}

.slideshow-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}


.new-button {
  /* 'NEW' u slideshow boxu */
  display: flex;
  background-color: #000000;
  margin-top: 0px;
  margin-bottom: 20px;
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

.theme {
  margin: 15px 0px 0px 0px;
  font-size: 12px !important;
  border: 2px solid #fed8aa;
  border-radius: 0px 0px 30px 0px;
  background-color: #ffc987;
  max-width: 200px;
  width: 100px;
  text-align: left;
  color: black !important;
  font-weight: 600 !important;
}

.theme ul {
  list-style-type: disc;
  padding-left: 20px;


}

.theme ul li::marker {
  color: white;

}



.forum-page {
  width: 20%;
  height: 90%;
  margin: -50px 300px 20px 50px;
  max-height: 600px;

}

.forum-content {
  background-color: #00000000;
  border: 3px solid #FF8C00;
  width: 100%;
  height: auto;
  max-height: 450px;
}

.forum-page p {
  font-size: 20px;
  font-weight: 450;
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
  background-color: rgb(241, 241, 241);
  padding: 20px;
  height: 100vh;
  display: flex;
  /* flex div */
  flex-direction: column;
  /* svrstavanje u vertikalno */
  align-items: center;
  /* align center */
  justify-content: center;
  /*  */
}

.theme-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(24, 24, 24);
  padding: 20px;
  font-size: 22px;
  color: white;
}

.theme-bar-links {
  list-style: none;
  padding: 0px;
  margin: 0px;
  align-items: center;
  font-size: 18px;

}

.theme-bar-links li {
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

.news-list-main {
  background-color: rgb(241, 241, 241);
  width: 100%;
  padding: 50px 0;
}

.news-list {
  max-width: calc(100%-600px);
  margin: 50px 300px 50px 300px;
  padding: 20px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.news {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  min-height: 220px;
  padding: 10px;
  position: relative;
  border-top: 1px solid #8a8a8a;
  width: 100%;
  padding-top: 40px;
}

.news:hover {
  cursor: pointer;
}

.news-image {
  width: 100%;
  aspect-ratio: 4 / 2;
  overflow: hidden;
  border-radius: 3px;
  object-fit: cover;
  object-position: center;
}

.news-title {
  text-align: left;
  font-size: large;
  font-weight: bold;
  margin-top: 185px;

}

.news img {
  margin-top: -110px;
  width: 100%;
  position: absolute;
  object-fit: cover;
}
</style>