<template>
  <q-page class="flex flex-center">
    <div class="main">
      <!-- Gornji dio s naslovom teme -->
      <div class="naslov">
        <h1 class="theme-naslov"><img src="/src/assets/tagicon.png" width="5%"> {{ tema.Naslov_teme }}</h1>
      </div>
      <h3 class="bio">Everything and anything "{{ tema.Naslov_teme }}" related</h3>
      <div class="crtica"></div>

      <!-- Vijesti u gridu -->
      <div v-if="vijesti.length === 0" class="no-news">
        <p>No news articles found for this theme.</p>
      </div>

      <div class="news-grid">
        <div v-for="newsItem in vijesti" :key="newsItem.ID_vijesti" class="news" @click="navigateToNews(newsItem.ID_vijesti)">
          <div class="news-card">
            <img :src="`http://localhost:3000${newsItem.slika_vijesti}`" alt="Slika vijesti" class="news-image">
            <div class="news-title">
              <p>{{ newsItem.naslov }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const tema = ref({});
const vijesti = ref([]);

// Navigacija na pojedinu vijest
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

// Dohvati temu prema ID-u
const fetchTema = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/teme/${route.params.id}`);
    tema.value = response.data;
  } catch (error) {
    console.error('Greška pri dohvaćanju teme:', error);
    router.push('/'); // Vrati na početnu stranicu ako tema nije pronađena
  }
};

// Dohvati vijesti za odabranu temu
const fetchVijestiByTema = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/vijesti/tema/${route.params.id}`);
    vijesti.value = response.data; // Vijesti filtrirane prema temi
  } catch (error) {
    console.error('Greška pri dohvaćanju vijesti za temu:', error);
  }
};

onMounted(() => {
  fetchTema();
  fetchVijestiByTema();
});
</script>

<style scoped>
.main {
  margin: 50px 300px; /* Margine sa strane */
}

.flex-center {
  background-color: rgb(241, 241, 241); /* Boja pozadine */

}

/* Header teme */
.naslov {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-height: fit-content;
  min-height: 100px;
}

.theme-naslov {
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 20px; 
  font-size: 5rem;
  font-weight: 500;
  color: black;
}

.bio{
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
}

.crtica{
  border-top: 2px solid black;
  width: 100%;  
  margin-bottom: 50px;
}


/* Grid za vijesti */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.news-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 5px;
  overflow: hidden;
  transition: transform 0.3s ease;
  min-height: 200px;
  height: fit-content;
}

.news-card:hover {
  transform: scale(1.01);
}

.news-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-bottom: 1px solid #ccc;
}

.news-title {
  padding: 10px;
  font-size: 1rem;
  text-align: left;
  font-weight: 650;
}
</style>