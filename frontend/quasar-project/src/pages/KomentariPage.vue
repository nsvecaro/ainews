<template>
  <q-page padding>
    <div class="Main">
      <h2>Komentari</h2>
      <div v-for="komentar in komentari" :key="komentar.ID_komentara" class="Komentar">
        <p><strong>Korisnik:</strong> {{ komentar.korisnik }}</p>
        <p><strong>Sadržaj:</strong> {{ komentar.sadrzaj }}</p>
        <p><strong>Datum objave:</strong> {{ new Date(komentar.datum_objave).toLocaleString() }}</p>
        <hr />
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      komentari: [],
    };
  },
  methods: {
    async fetchKomentari() {
      try {
        const response = await axios.get("http://localhost:3000/komentari");
        this.komentari = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja komentara:", error);
      }
    },
  },
  created() {
    this.fetchKomentari(); 
  },
};
</script>

<style>
.Main {
  background-color: gray;
  margin: 50px 300px 50px 300px;
  padding: 20px;
  color: white;
  border-radius: 10px;
}

.Komentar {
  background: white;
  color: black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
