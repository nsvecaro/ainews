<template>
  <q-page class="flex flex-center">
    <div class="forum-page">
      
      <div class="forum-header">
        <h1>{{ forumName }}</h1>
        <p>Welcome to the {{ forumName }} community! Discuss all things related to IT in Croatia.</p>
      </div>

      
      <div class="posts-list">
        <div
          v-for="post in forumPosts"
          :key="post.id"
          class="post-item"
        >
          
          <div class="post-header">
            <span class="user-name">{{ post.userName }}</span>
            <span class="post-title">{{ post.title }}</span>
          </div>

          
          <div class="image-box" v-if="post.imageUrl">
            <img :src="post.imageUrl" alt="Image" />
          </div>

          
          <p class="post-content">{{ post.content }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ForumPage",
  data() {
    return {
      forumName: '',
      forumPosts: [
        { id: 1, userName: "techguy42", title: "The Future of Web Development in Croatia", content: "Web development in Croatia is growing fast. New frameworks and technologies are emerging...", imageUrl: "https://via.placeholder.com/400x200?text=Web+Development+Image" },
        { id: 2, userName: "devgal93", title: "AI in Croatian IT Industry", content: "AI is making huge strides in the Croatian IT industry...", imageUrl: "https://via.placeholder.com/400x200?text=AI+Image" },
        { id: 3, userName: "codinghero", title: "Top Frontend Libraries to Learn in 2025", content: "In 2025, there are a few frontend libraries you should definitely learn...", imageUrl: "https://via.placeholder.com/400x200?text=Frontend+Libraries+Image" },
      ],
    };
  },
  mounted() {
    // uzima naziv foruma iz URL parametra
    this.forumName = this.$route.params.forumName;
  },
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

.image-box {
  margin-top: 20px;
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
  margin-top: 15px;
}
</style>
