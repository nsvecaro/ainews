<template>
  <q-page padding>
    <div class="post-detail">
      <div class="post-header">
        <h2>{{ post.naslov }}</h2>
        <div class="post-meta">
          <span class="user-name">{{ post.autor }}</span>
          <span class="post-date">{{ post.datum_objave }}</span>
        </div>
      </div>

      <div class="image-box" v-if="post.slika">
        <img :src="post.slika" alt="Post Image" />
      </div>

      <div class="post-content">
        <p>{{ post.sadrzaj }}</p>
      </div>

      <div class="comments-section">
        <h3>Comments</h3>
        <div v-for="comment in post.komentari" :key="comment.id" class="comment">
          <div class="comment-header">
            <span class="comment-user">{{ comment.username }}</span>
            <span class="comment-date">{{ comment.datum_objave }}</span>
          </div>
          <p class="comment-content">{{ comment.sadrzaj }}</p>
        </div>
      </div>

      <div class="comment-form">
        <q-input filled label="Write a comment..." v-model="newComment" />
        <q-btn label="Post Comment" color="primary" @click="postComment" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref({});
const newComment = ref("");

onMounted(() => {
  const postId = route.params.postId;
  axios
    .get(`http://localhost:3000/api/forumObjava/objava/${postId}`)
    .then(response => {
      post.value = response.data;
    })
    .catch(error => {
      console.error("Greška pri dohvaćanju objave:", error);
    });
});

const postComment = () => {
  if (newComment.value.trim()) {
    // Pretpostavimo da šaljemo novi komentar na server
    const comment = {
      id: post.value.komentari.length + 1,
      username: "newUser",  
      content: newComment.value,
      date: new Date().toLocaleDateString()
    };
    post.value.komentari.push(comment);
    newComment.value = "";
  }
};
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.post-header h2 {
  font-size: 28px;
  color: #007bff;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
}

.user-name {
  font-weight: bold;
  color: #007bff;
}

.post-date {
  color: #888;
}

.image-box {
  margin: 20px 0;
  text-align: center;
}

.image-box img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.post-content {
  font-size: 16px;
  color: #555;
}

.comments-section {
  margin-top: 40px;
}

.comments-section h3 {
  font-size: 22px;
  color: #333;
}

.comment {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
}

.comment-user {
  font-weight: bold;
}

.comment-date {
  color: #888;
}

.comment-content {
  font-size: 16px;
  color: #555;
  margin-top: 10px;
}

.comment-form {
  margin-top: 30px;
}

.comment-form q-input {
  width: 100%;
}

.comment-form q-btn {
  margin-top: 10px;
}
</style>
