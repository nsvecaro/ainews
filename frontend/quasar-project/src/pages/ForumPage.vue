<template>
  <q-page padding>
    <div class="forum-page">
      <div class="forum-header">
        <div class="forum-title">
          <h1>{{ forumName }}</h1>
        </div>
        <div class="forum-description">
          <p>{{ forumOpis }}</p>
        </div>
      </div>

      <div class="divider"></div>

      <div class="create-post-btn">
        <q-btn label="Create Post" color="primary" @click="goToCreatePost" />
      </div>

      <div class="posts-list">
        <div v-for="post in forumPosts" :key="post.ID_objave" class="post-item">
          <div class="post-content">
            <div class="left-side">
              <span class="user-name">{{ post.autor }}</span>
              <span class="post-title" @click="goToPost(post.ID_objave)">{{ post.naslov }}</span>
              <p class="post-text">{{ truncateText(post.sadrzaj, 5) }}</p>
            </div>

            <div class="right-side">
              <img v-if="post.slika" :src="post.slika" alt="Post Image" class="post-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

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
      this.$router.push(`/user/forum/${this.$route.params.forumId}/${postId}`);
    },

    goToCreatePost() {
      
      this.$router.push(`/user/forum/${this.$route.params.forumId}/create`);
    },

    truncateText(text, wordCount) {
      const words = text.split(' ');
      if (words.length > wordCount) {
        return words.slice(0, wordCount).join(' ') + '...';
      }
      return text;
    },
  },
  mounted() {
    const forumId = this.$route.params.forumId;

    // Dohvat foruma i objava
    axios.get(`http://localhost:3000/api/forumi/${forumId}`)
      .then(response => {
        this.forumName = response.data.Naziv;
        this.forumOpis = response.data.Opis;
      })
      .catch(error => {
        console.error("Error fetching forum data:", error);
      });

    axios.get(`http://localhost:3000/api/forumObjava/${forumId}`)
      .then(response => {
        this.forumPosts = response.data;
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }
};
</script>


<style scoped>
.forum-page {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
}

.forum-header {
  text-align: left;
  margin-bottom: 30px;
}

.forum-title {
  margin-bottom: 10px;
}

.forum-header h1 {
  font-size: 46px;
  color: #007bff;
  font-weight: 600;
}

.forum-description {
  font-size: 18px;
  color: #333;
}

.divider {
  height: 1px;
  background-color: #ddd;
  margin-bottom: 30px;
}

.create-post-btn {
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-start; 
  padding: 10px 0;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.post-item {
  display: flex;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.post-item:hover {
  transform: translateY(-5px);
}

.post-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.left-side {
  width: 70%;
  padding-right: 20px;
}

.right-side {
  width: 30%;
}

.user-name {
  font-weight: bold;
  color: #007bff;
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
}

.post-title {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
  cursor: pointer;
}

.post-text {
  font-size: 16px;
  color: #555;
  margin-top: 15px;
}

.post-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
