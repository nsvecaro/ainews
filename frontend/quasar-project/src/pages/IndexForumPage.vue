<template>
  <q-page class="flex flex-center">
    <div class="front-page">
      <div class="content">
        <!-- Top Discusions -->
        <div class="forum-section">
          <h2>Top Discussions</h2>
          <div class="discussions-list">
            <div
              v-for="discussion in discussions"
              :key="discussion.id"
              class="discussion-item"
            >
              <h3 @click="goToForum(discussion.forumName)">{{ discussion.forumName }}</h3>
              <p>{{ truncateText(discussion.content, 5) }}</p>
            </div>
          </div>
        </div>

        <!-- Newest Discussions -->
        <div class="forum-section">
          <h2>Newest Discussions</h2>
          <div class="discussions-list">
            <div
              v-for="newDiscussion in newestDiscussions"
              :key="newDiscussion.id"
              class="discussion-item"
            >
              <h3 @click="goToForum(newDiscussion.forumName)">{{ newDiscussion.forumName }}</h3>
              <p>{{ newDiscussion.content }}</p>
            </div>
          </div>
        </div>

        <!-- All Forums -->
        <div class="forum-section">
          <h2>All Forums</h2>
          <ul class="forums-list">
            <li
              v-for="forum in forums"
              :key="forum.id"
              @click="goToForum(forum.name)"
              style="cursor: pointer;"
            >
              {{ forum.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "IndexForumPage",
  data() {
    return {
      discussions: [
        { id: 1, forumName: "r/croIT", content: "Ovo je neka zanimljiva tema o IT razvoju u Hrvatskoj." },
        { id: 2, forumName: "r/frontend", content: "Diskutiramo o najnovijim frontend tehnologijama." },
        { id: 3, forumName: "r/devops", content: "DevOps prakse i alati za efikasniji rad." },
      ],
      newestDiscussions: [
        { id: 1, forumName: "r/croIT", content: "AInews napokon završili projekt..." },
        { id: 2, forumName: "r/ml", content: "Novi model za strojno učenje lansiran..." },
        { id: 3, forumName: "r/cloud", content: "Najbolje prakse za migraciju u oblak..." },
      ],
      forums: [
        { id: 1, name: "r/croIT" },
        { id: 2, name: "r/frontend" },
        { id: 3, name: "r/devops" },
        { id: 4, name: "r/ml" },
        { id: 5, name: "r/cloud" },
      ],
    };
  },
  methods: {
    goToForum(forumName) {
      //prebacivanje usera
      this.$router.push(`/forum/${forumName}`);
    },
    truncateText(text, wordCount) {
      const words = text.split(" ");
      if (words.length > wordCount) {
        return words.slice(0, wordCount).join(" ") + "...";
      }
      return text;
    },
  },
};
</script>


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
