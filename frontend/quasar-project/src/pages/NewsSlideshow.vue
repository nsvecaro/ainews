<template>
  <div class="newsbox">
    <h3>Most Popular</h3>
    <div class="carousel-container">
      <button class="nav-button left" @click="prevSlide">‹</button>
      <div class="carousel" :style="{ transform: slideTransform }">
        <div class="carousel-item" v-for="news in newsList" :key="news.id" @click="goToNewsPage(news.id)">
          <img :src="`http://localhost:3000${news.image}`" alt="News Image" class="news-image" />
          <p class="news-title">{{ news.title }}</p>
        </div>
      </div>
      <button class="nav-button right" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const newsList = ref([]);
const currentSlide = ref(0);
const router = useRouter();

// Funkcija za dohvatit top 4 vijesti po broju komentara (kad dodamo jos vijesti promjenit treba u top 5)
const fetchTopNews = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/vijesti/top-komentari');
    newsList.value = response.data.sort((a, b) => b.commentCount - a.commentCount).slice(0, 4); // uzimanje samo top 4 vijesti
  } catch (error) {
    console.error('Greška prilikom dohvaćanja top vijesti:', error);
  }
};

// Pozicija slideshowa
const slideTransform = computed(() => {
  return `translateX(-${currentSlide.value * 100}%)`; 
});


function nextSlide() {
  if (currentSlide.value < newsList.value.length - 1) { // posto ima samo 4 vijesti u bazi zasad
    currentSlide.value++;
  }
}


function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
}

// Navigate to news page
function goToNewsPage(id) {
  router.push({ name: 'VijestiPage', params: { id } });
}

// Dohvati top vijesti nakon montaze komponente
onMounted(() => {
  fetchTopNews();
});
</script>

<style scoped>
.newsbox {
  background: #ffffff;
  border-top: 8px solid #FF8C00;
  padding: 40px;
  height: 550px;
  width: 900px; 
  margin: 50px auto;
}

.carousel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel-item {
  min-width: 100%; 
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  cursor: pointer; 
}

.news-image {
  width: 100%;
  height: auto;
  max-height: 250px; 
  object-fit: cover; 
  border-radius: 5px;
}

.news-title {
  font-size: 1rem;
  margin-top: 10px;
}

.nav-button {
  background-color: #ff8c00;
  color: white;
  border: none;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
}

.nav-button:hover {
  background-color: #ff6a00;
}

.left {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-60%);
}

.right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-60%);
}
</style>
