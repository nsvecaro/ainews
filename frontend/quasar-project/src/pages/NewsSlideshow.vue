<template>
  <div class="newsbox">
    <h3>Most Popular</h3>
    <div class="carousel-container">
      <button class="nav-button left" @click="prevSlide">‹</button> <!-- < button izrada -->
      <div class="carousel" :style="{ transform: slideTransform }">
        <div class="carousel-item" v-for="news in newsList" :key="news.id">
          <img :src="news.image" alt="News Image" class="news-image" />
          <p class="news-title">{{ news.title }}</p>
        </div>
      </div>
      <button class="nav-button right" @click="nextSlide">›</button> <!-- > button izrada -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Dummy Podatci -- kasnije ce vuci podatke iz baze podataka !!!!!
const newsList = ref([
  { id: 1, title: 'Tesla imported AI', image: '' },
  { id: 2, title: 'OpenAI announces GPT-4', image: '' },
  { id: 3, title: 'Breakthrough in AI ethics', image: '' },
  { id: 4, title: 'New AI startup raises $100M', image: '' },
  { id: 5, title: 'AI in healthcare', image: '' },
]);

const currentSlide = ref(0);
// Pozicija slideshowa
const slideTransform = computed(() => {
  return `translateX(-${currentSlide.value * 100 / 2.5}%)`;
});

// sljedeca vijest
function nextSlide() {
  if (currentSlide.value < newsList.value.length - 2) { // -2 jer vidimo 2.5 vijesti
    currentSlide.value++;
  }
}

// vijest za nazad
function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
}
</script>

<style scoped>

.newsbox {
  background: #ffffff;
  border-top: 8px solid #FF8C00;
  padding: 40px;
  height: auto;
  margin: 5000px 300px 20px 300px;
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
  min-width: calc(100% / 2.5); /* 2.5 vijesti */
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
}

.news-image {
  width: 100%;
  height: auto;
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