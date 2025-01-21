<template>
  <q-page class="flex flex-center">
    <div class="forum-page">
      <div class="forum-header">
        <h1>{{ forumName }}</h1>
        <p>{{ forumOpis }}</p>
      </div>

      <div class="posts-list">
        <div v-for="post in forumPosts" :key="post.ID_objave" class="post-item">
          <div class="post-header">
            <span class="user-name">{{ post.autor }}</span>
            <span class="post-title" @click="goToPost(post.ID_objave)">{{ post.naslov }}</span>
          </div>
          <p class="post-content">{{ post.sadrzaj }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: "ForumPage",
  data() {
    return {
      forumName: '',
      forumOpis: '',
      forumPosts: []
    };
  },
  methods: {
    goToPost(postId) {
      this.$router.push(`/forum/${this.$route.params.forumId}/${postId}`);
    }
  },
  mounted() {
    const forumId = this.$route.params.forumId;

    // Dohvati podatke foruma (ime, opis)
    axios.get(`http://localhost:3000/api/forumi/${forumId}`)
      .then(response => {
        this.forumName = response.data.Naziv;
        this.forumOpis = response.data.Opis;
      })
      .catch(error => {
        console.error("Greška pri dohvaćanju foruma:", error);
      });

    // Dohvati objave u ovom forumu
    axios.get(`http://localhost:3000/api/forumObjava/${forumId}`)
      .then(response => {
        this.forumPosts = response.data;
      })
      .catch(error => {
        console.error("Greška pri dohvaćanju objava:", error);
      });
  }
};
</script>


<style scoped>
.forum-page {
  width: 85%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.forum-header {
  text-align: center;
  margin-bottom: 40px;
}

.forum-header h1 {
  font-size: 36px;
  color: #007bff;
  margin-bottom: 10px;
}

.forum-header p {
  font-size: 18px;
  color: #333;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-item {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.post-item:hover {
  transform: translateY(-5px);
}

.post-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.user-name {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 5px;
}

.post-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.post-content {
  font-size: 16px;
  color: #555;
  margin-top: 15px;
}
</style>
