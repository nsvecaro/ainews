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
            <img :src="`http://localhost:3000${vijest.slika_vijesti}`" alt="Slika vijesti" class="news-image" />
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

      <!-- Komentari -->
      <div class="comments-section">
        <h3>Comments</h3>
        <div id="listaKomentara">
          <p v-if="loadingKomentari">Loading comments...</p>
          <p v-else-if="!komentari.length">There are still no comments for this article.</p>
          <div v-else v-for="komentar in komentari" :key="komentar.ID_komentara" class="komentar">
            <p><strong>{{ komentar.username }}</strong> ({{ formatDate(komentar.datum_objave) }}):</p>
            <p>{{ komentar.sadrzaj }}</p>
          </div>
        </div>
        <form @submit.prevent="posaljiKomentar" id="formaKomentar">
          <textarea v-model="noviKomentar.sadrzaj" placeholder="Enter your comment..." required rows="4"
            class="textarea"></textarea>
          <button type="submit" class="submit-button">Send</button>
        </form>
      </div>
    </div>
    <!-- FOOTER -->
    <Footer />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Footer from '/src/pages/FooterPage.vue';

const vijest = ref({});
const loading = ref(true);
const error = ref(null);

const komentari = ref([]);
const noviKomentar = ref({ sadrzaj: '', ID_korisnika: 1, ID_vijesti: null });
const loadingKomentari = ref(true);

const route = useRoute();
const id = route.params.id;

// funkcija za dohvat vijesti po ID-u
const fetchVijest = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/vijesti/${id}`);
    vijest.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.message || `News with ID ${id} not found`;
  } finally {
    loading.value = false;
  }
};

// funkcija za dohvat komentara po ID vijesti
const fetchKomentari = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/komentar/${id}`);
    komentari.value = response.data;
  } catch (error) {
    console.error('Greška prilikom dohvaćanja komentara:', error);
  } finally {
    loadingKomentari.value = false;
  }
};

// funkcija za slanje komentara
const posaljiKomentar = async () => {
  if (!noviKomentar.value.sadrzaj.trim()) return;

  try {
    const response = await axios.post(
      "http://localhost:3000/api/komentar",
      {
        sadrzaj: noviKomentar.value.sadrzaj,
        ID_vijesti: id,
      },
      {
        withCredentials: true, // Osigurava slanje kolačića
      }
    );

    komentari.value.unshift(response.data);
    noviKomentar.value.sadrzaj = '';
  } catch (error) {
    console.error('Greška prilikom slanja komentara:', error);
  }
};

import { nextTick } from 'vue';

// vraca na spremljen polozaj pagea
onMounted(async () => {
  await fetchVijest();
  await fetchKomentari();

  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition) {
    nextTick(() => {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem('scrollPosition');
    });
  }
});


//init
onMounted(() => {
  fetchVijest();
  fetchKomentari();
});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-UK', { year: 'numeric', month: 'long', day: 'numeric' });
};
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

.news-content {
  margin: 50px auto;
  text-align: justify;
  font-size: medium;
  padding: 20px;
  max-width: 800px;
}

.q-parallax {
  margin: 0 !important;
  padding: -20 !important;
  width: 105vw;
  max-width: 100%;
  overflow: hidden;
}

.meta {
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: center;
  color: rgb(126, 126, 126);
}

.gradient {
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
  margin: auto;
  text-align: center;
}

.comments-section {
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  max-width: 800px;
}

.komentar {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.komentar p {
  margin: 5px 0;
}

.textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.submit-button {
  background-color: #007BFF;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
