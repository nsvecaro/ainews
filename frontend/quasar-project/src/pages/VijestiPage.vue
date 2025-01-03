<template>
  <q-page padding>
    <div v-if="loading" class="text-center">
      <q-spinner color="primary" size="2em" />
      <p>Loading the news...</p>
    </div>
    <div v-else-if="error" class="text-center text-negative">
      <p>Error: {{ error }}</p>
    </div>
    <div v-else>
      <div class="news-picture">
        <img :src="vijest.slika_vijesti" alt="Slika vijesti" class="news-image" />
        <h1>{{ vijest.naslov }}</h1>
      </div>
      <div class="news-content">
        <p class="meta">
          <strong>Author:</strong> {{ vijest.autor }} |
          <strong>Date:</strong> {{ formatDate(vijest.datum_objave) }}
        </p>

        <p class="content">{{ vijest.sadrzaj }}</p>
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

</style>