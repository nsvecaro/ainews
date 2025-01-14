<template>
    <q-page class="flex flex-center">
      <q-card class="my-comments-card" v-if="comments.length > 0">
        <q-card-section>
          <div class="text-h6">My Comments</div>
        </q-card-section>
  
        <q-list>
          <q-item v-for="comment in paginatedComments" :key="comment.ID_komentara">
            <q-item-section>
              <div>
                <strong>Commented on:</strong> {{ comment.vijest_naslov }}
              </div>
              <div>
                <strong>Comment:</strong> {{ comment.sadrzaj }}
              </div>
              <div>
                <small>{{ comment.datum_objave }}</small>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
  
        <q-btn
          v-if="hasMoreComments"
          label="Load More"
          @click="loadMoreComments"
          color="primary"
          class="full-width"
        />
      </q-card>
  
      <q-card v-else>
        <q-card-section>
          <div class="text-h6">You have no comments yet.</div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useQuasar } from 'quasar';
  import axios from 'axios';
  
  export default {
    name: 'MyComments',
    setup() {
      const $q = useQuasar();
      const comments = ref([]);
      const paginatedComments = ref([]);
      const pageSize = 5; // Broj komentara po stranici
      const currentPage = ref(1);
      const hasMoreComments = ref(false);
  
      const userID = 1;  // Zamijeni s ID-em korisnika koji je trenutno prijavljen
  
      // Funkcija za učitavanje komentara
      const fetchComments = async () => {
        try {
          const response = await axios.get(`/api/komentar/mycomments/${userID}`);
          comments.value = response.data;
  
          // Učitaj prvih nekoliko komentara
          loadCommentsPage();
        } catch (error) {
          $q.notify({
            type: 'negative',
            message: 'Failed to load comments.',
          });
        }
      };
  
      // Funkcija za učitavanje komentara za trenutnu stranicu
      const loadCommentsPage = () => {
        const start = (currentPage.value - 1) * pageSize;
        const end = currentPage.value * pageSize;
        paginatedComments.value = comments.value.slice(start, end);
  
        // Provjeri ima li još komentara za učitati
        hasMoreComments.value = comments.value.length > end;
      };
  
      // Funkcija za učitavanje više komentara
      const loadMoreComments = () => {
        currentPage.value++;
        loadCommentsPage();
      };
  
      onMounted(() => {
        fetchComments();
      });
  
      return {
        comments,
        paginatedComments,
        hasMoreComments,
        loadMoreComments,
      };
    },
  };
  </script>
  
  <style scoped>
  .my-comments-card {
    max-width: 800px;
    width: 100%;
    margin: 20px;
  }
  
  .q-item-section {
    margin-bottom: 10px;
  }
  
  .q-btn {
    margin-top: 20px;
  }
  </style>
  