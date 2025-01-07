<template>
  <q-page>
    <div class="forum-container">
      <h1>Forum</h1>
      <div class="topics-section">
        <h2>Popular Topics</h2>
        <div class="topics">
          <q-card v-for="topic in topics" :key="topic.id" class="topic-card">
            <q-card-section>
              <h3>{{ topic.name }}</h3>
              <p>{{ topic.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="news-section">
        <h2>Latest News</h2>
        <div class="news">
          <q-card v-for="newsItem in news" :key="newsItem.id" class="news-card">
            <q-img :src="newsItem.image" class="news-image" />
            <q-card-section>
              <h3>{{ newsItem.title }}</h3>
              <p>{{ newsItem.content }}</p>
              <span class="news-meta">By {{ newsItem.author }}</span>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      topics: [
        { id: 1, name: "Artificial Intelligence", description: "Discuss AI advancements and innovations." },
        { id: 2, name: "Machine Learning", description: "Explore ML techniques and applications." },
        { id: 3, name: "AI Ethics", description: "Delve into ethical considerations in AI." },
      ],
      news: [
        {
          id: 1,
          title: "AI Breakthrough in Medicine",
          content: "A new AI model is revolutionizing healthcare...",
          image: "/src/assets/news-placeholder.jpg",
          author: "Admin",
        },
        {
          id: 2,
          title: "Advances in Neural Networks",
          content: "Researchers have developed a cutting-edge neural network...",
          image: "/src/assets/news-placeholder.jpg",
          author: "Tech News",
        },
      ],
    };
  },
};
</script>

<style scoped>
.forum-container {
  padding: 20px;
  background-color: #f9f9f9;
}

.topics-section,
.news-section {
  margin-bottom: 40px;
}

h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.topics,
.news {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.topic-card,
.news-card {
  width: calc(33% - 20px);
}

.news-image {
  max-height: 150px;
  object-fit: cover;
}

.news-meta {
  font-size: 12px;
  color: gray;
  margin-top: 10px;
}
</style>
