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


const fetchTopNews = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/vijesti/top-komentari');
    newsList.value = response.data.sort((a, b) => b.commentCount - a.commentCount).slice(0, 7);
  } catch (error) {
    console.error('Error fetching top news:', error);
  }
};


const slideTransform = computed(() => {
  return `translateX(-${currentSlide.value * (100 / 2.5)}%)`; 
});


function nextSlide() {
  
  if (currentSlide.value < newsList.value.length - 2.5) {
    currentSlide.value++;
  }
}


function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
}


function goToNewsPage(id) {
  router.push({ name: 'VijestiPage', params: { id } });
}


onMounted(() => {
  fetchTopNews();
});
</script>

<style scoped>
.newsbox {
  background: white;
  border-top: 8px solid #FF8C00;
  padding: 30px;
  height: 550px;
  width: calc(100% - 600px);
  margin: 50px auto;
}

.newsbox h3 {
  font-weight: 400;
  margin-bottom: 20px;
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
  width: calc(100% * 6 / 2.5);
}

.carousel-item {
  flex: 0 0 calc(100% / 2.5);
  
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  cursor: pointer;
}

.news-image {
  width: 100%;
  
  height: 200px;
  
  object-fit: cover;
  
  object-position: center;
  
  border-radius: 5px;
}

.news-title {
  font-size: 1rem;
  margin-top: 10px;
  text-align: left;
}

.nav-button {
  background-color: #ff8c00;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.5s ease;
  
}

.nav-button:hover {
  background-color: #ff6a00;
}

.left {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.right {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}
</style>