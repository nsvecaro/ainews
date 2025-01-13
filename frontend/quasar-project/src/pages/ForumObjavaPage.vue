<template>
  <q-page padding>
    <!-- forum post - The Future of Web Development in Croatia -->
    <div class="post-detail">
      <!-- zaglavlje posta-->
      <div class="post-header">
        <h2>{{ post.title }}</h2>
        <div class="post-meta">
          <span class="user-name">{{ post.userName }}</span>
          <span class="post-date">{{ post.date }}</span>
        </div>
      </div>

      <!-- slika u postu -->
      <div class="image-box" v-if="post.imageUrl">
        <img :src="post.imageUrl" alt="Post Image" />
      </div>

      <!-- sadrzaj -->
      <div class="post-content">
        <p>{{ post.content }}</p>
      </div>

      <!-- komentari -->
      <div class="comments-section">
        <h3>Comments</h3>
        <div v-for="comment in post.comments" :key="comment.id" class="comment">
          <div class="comment-header">
            <span class="comment-user">{{ comment.userName }}</span>
            <span class="comment-date">{{ comment.date }}</span>
          </div>
          <p class="comment-content">{{ comment.content }}</p>
        </div>
      </div>

      <!-- forma za comments -->
      <div class="comment-form">
        <q-input filled label="Write a comment..." v-model="newComment" />
        <q-btn label="Post Comment" color="primary" @click="postComment" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// dumy kod
const post = ref({
  id: 1,
  userName: "techguy42",
  title: "The Future of Web Development in Croatia",
  content: "Web development in Croatia is growing fast. New frameworks and technologies are emerging. There's a lot of potential for local developers, with international companies looking at Croatia as a viable tech hub.",
  imageUrl: "https://via.placeholder.com/600x300?text=Web+Development+Image",
  date: "2025-01-13",
  comments: [
    { id: 1, userName: "devgal93", content: "This is an exciting time for web development in Croatia! Looking forward to more growth.", date: "2025-01-14" },
    { id: 2, userName: "codinghero", content: "I completely agree! Web development is growing rapidly, and the potential is huge.", date: "2025-01-15" },
  ]
});

const newComment = ref("");

const postComment = () => {
  if (newComment.value.trim()) {
    const comment = {
      id: post.value.comments.length + 1,
      userName: "newUser",  
      content: newComment.value,
      date: new Date().toLocaleDateString()
    };
    post.value.comments.push(comment);
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
