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
              <small>{{ formatDate(comment.datum_objave) }}</small>
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
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export default {
  name: "MyComments",
  setup() {
    const $q = useQuasar();
    const comments = ref([]);
    const paginatedComments = ref([]);
    const pageSize = 5; // Broj komentara po stranici
    const currentPage = ref(1);
    const hasMoreComments = ref(false);

    // Dohvati korisnički ID iz LocalStorage
    const userID = localStorage.getItem("userId");

    // Provjera ako korisnik nije prijavljen
    if (!userID) {
      $q.notify({
        type: "negative",
        message: "You must be logged in to view your comments.",
      });
      return;  // Ako nema userID, ne nastavljaj dalje
    }

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("hr-HR", options);
    };

    // Funkcija za učitavanje komentara
    const fetchComments = async () => {
      try {
        // API poziv za dohvat komentara prema korisničkom ID-u iz sesije
        const response = await axios.get(`/api/komentar/mycomments`, {
          withCredentials: true,
        });

        console.log("Odgovor od API-ja:", response.data);  // Logiraj API odgovor

        if (response.data && Array.isArray(response.data)) {
          comments.value = response.data;

          if (comments.value.length === 0) {
            $q.notify({
              type: "negative",
              message: "No comments found for this user.",
            });
          }
          loadCommentsPage();
        } else {
          $q.notify({
            type: "negative",
            message: "Failed to load comments.",
          });
        }
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Failed to load comments.",
        });
        console.error("Greška prilikom učitavanja komentara:", error);
      }
    };

    // Funkcija za učitavanje komentara za trenutnu stranicu
    const loadCommentsPage = () => {
      const start = (currentPage.value - 1) * pageSize;
      const end = currentPage.value * pageSize;
      paginatedComments.value = comments.value.slice(start, end);

      console.log("Paginated comments:", paginatedComments.value);  // Logiraj paginirane komentare

      hasMoreComments.value = comments.value.length > end;
    };

    // Funkcija za učitavanje više komentara
    const loadMoreComments = () => {
      currentPage.value++;
      loadCommentsPage();
    };

    // Pozivaj fetchComments prilikom mountanja komponente
    onMounted(() => {
      fetchComments();
    });

    return {
      comments,
      paginatedComments,
      hasMoreComments,
      loadMoreComments,
      formatDate,
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
