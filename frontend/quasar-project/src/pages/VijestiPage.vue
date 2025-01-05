<template>
  <q-page class="flex flex-center">
    <div v-if="loading" class="text-center">
      <q-spinner color="primary" size="2em" />
      <p>Loading the news...</p>
    </div>
    <div v-else>
      <div class="news-picture">
        <q-parallax :height="500" :speed="2">
          <template v-slot:media>
            <img :src="`http://localhost:3000${vijest.slika_vijesti}`" alt="Slika vijesti" class="news-image">  
          <div class="parallax-title">
            <h1 class="text-white text-center">{{ vijest.naslov }}</h1>
          </div>
          <div class="gradient"></div>
          </template>
          
        </q-parallax>
      </div>
      <div class="news-content">
        <p class="meta">
          <strong>Author:</strong> {{ vijest.autor }} |
          <strong>Date:</strong> {{ formatDate(vijest.datum_objave) }}
        </p>
        <p class="content" v-html="vijest.sadrzaj"></p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const vijest = ref({})
const loading = ref(true)
const error = ref(null)

const route = useRoute()
const id = route.params.id

// Funkcija za dohvat vijesti po ID-u
const fetchVijest = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/vijesti/${id}`);
    vijest.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || `News with ID ${id} not found`
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' })
}

onMounted(() => {
  fetchVijest()
})
</script>

<style>
.q-page {
  margin: 0;
  padding: 0;
  width: 100vw;
  overflow-x: hidden;
}

.news-picture {
  width: 100%;
  object-fit: cover;
}
.news-content{
  margin: 50px 400px 50px 400px;
  text-align: justify;
  font-size: medium;
  padding: 20px;
}

.q-parallax {
  margin: 0 !important;
  padding: -20 !important;
  width: 105vw;
  max-width: 100%;
  overflow: hidden;
}
.meta{
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
  color: rgb(126, 126, 126);
}
.gradient{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.595), rgba(0, 0, 0, 0));
  z-index: 5;
}


.parallax-title {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 2px 2px 12px rgb(0, 0, 0);
  width: 100vw;
}

.parallax-title h1 {
  font-size: 3.0rem;
  font-weight: bold;
  margin: auto 400px auto 400px;
}
</style>