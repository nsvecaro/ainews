<template>
  <q-page class="flex flex-center">
    <div class="front-page">
      <div class="content">
        <!-- All Forums -->
        <div class="forum-section">
          <h2>All Forums</h2>
          <ul class="forums-list">
            <li
              v-for="forum in forums"
              :key="forum.ID_foruma"
              @click="goToForum(forum.ID_foruma)"
              style="cursor: pointer;"
            >
              {{ forum.Naziv }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: "IndexForumPage",
  data() {
    return {
      forums: [],  // Pokrenut ćemo varijablu za forume
    };
  },
  methods: {
    // Funkcija za prebacivanje na forum stranicu prema ID-u foruma
    goToForum(forumId) {
      this.$router.push(`/forum/${forumId}`);
    },
  },
  mounted() {
    // Dohvatimo forume prilikom montaže stranice
    axios
      .get("http://localhost:3000/api/forumi")
      .then((response) => {
        this.forums = response.data;  // Spremamo forume u data
      })
      .catch((error) => {
        console.error("Greška pri dohvaćanju foruma:", error);
      });
  },
};
</script>

<style scoped>
/* Stilovi za prikaz foruma */
.forum-section {
  margin-bottom: 20px;
}

.forums-list {
  list-style-type: none;
  padding: 0;
}

.forums-list li {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 5px;
}

.forums-list li:hover {
  background-color: #e0e0e0;
}
</style>


<style scoped>
.front-page {
  width: 100%;
  background-color: rgb(0, 98, 255);
  color: rgb(255, 255, 255);
  padding: 20px;
  display: flex;
  justify-content: center;
}

.content {
  background-color: #f9f9f9;
  width: 60%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 40px; 
}

.forum-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px; 
}

.forum-section h2 {
  font-size: 24px;
  font-weight: bold;
  color: rgb(0, 98, 255);
  margin-bottom: 15px;
}

.discussions-list,
.forums-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.discussion-item,
.forums-list li {
  padding: 15px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.discussion-item h3 {
  font-size: 18px;
  color: #007bff;
  margin-bottom: 5px;
}

.discussion-item p,
.forums-list li {
  font-size: 16px;
  color: #333;
}

.forums-list {
  list-style-type: none;
  padding: 0;
}

.forums-list li {
  font-size: 18px;
}
</style>
