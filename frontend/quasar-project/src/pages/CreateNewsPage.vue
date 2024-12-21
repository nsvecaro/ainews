<template>
  <q-page padding>
    <!-- Naslov stranice -->

    <div class="Box">
      <h3>Create a new article</h3>
      <q-form @submit.prevent="onSubmit" class="q-pa-md">

        <!-- Naslov vijesti -->
        Title
        <q-input v-model="news.title" standout label="" class="q-mb-md custom-input" color="white" bg-color="none" />

        <!-- Autor vijesti -->
        Author
        <q-input v-model="news.author" standout label="" class="q-mb-md custom-input" color="white" bg-color="none" />

        <!-- Sadržaj vijesti -->
        <div class="editor-wrapper q-mb-md">
          News content
          <q-editor label="Content" v-model="news.content" :toolbar="[
            ['bold', 'italic', 'underline'],
            ['unordered', 'ordered'],
            ['undo', 'redo'],
            ['quote', 'code'],
            ['link'],
            ['fontSize', 'removeFormat']
          ]" class="custom-editor" color="white" bg-color="none" />
        </div>

      <!-- Slika i kategorija div-->
        <div class="file-select-wrapper q-mb-md">
          <!-- Upload slika -->
          <q-file v-model="news.image" standout label="Click to upload an image" accept="image/*"
            class="custom-input custom-file-width" color="white" bg-color="none">
            <template v-slot:prepend>
              <q-icon name="attach_file" color="black" />
            </template>
          </q-file>

          <!-- Odabir kategorije -->
          <q-select v-model="news.category" standout :options="['']" label="Select category"
            class="custom-input custom-select-width" color="white" bg-color="none" />
        </div>


        <!-- Gumb za spremanje -->
        <div class="q-mt-lg text-center">
          <q-btn type="submit" color="white" text-color="black" label="SAVE" />
        </div>
      </q-form>
    </div>

  </q-page>
  <div class="footer">
    <div class="footerinfo">
      <h3>AI NEWS</h3>
      <p>All rights reserved by AINews &#169;</p>
    </div>
    <div class="socialmedia">
      <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Instagram</a>
      <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">Facebook</a>
      <a href="www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="20px">X</a>
    </div>
  </div>
</template>

<script setup>
// Reactive podaci za unos vijesti
import { reactive } from 'vue';

const news = reactive({
  title: '',
  author: '',
  content: '',
  image: null,
});

// Dummy funkcija za submit forme
const onSubmit = () => {
  console.log('Unesena vijest:', news);
  alert('Vijest je spremljena! (Simulacija)');
};
</script>


<style>
.Box {
  margin: 20px 300px 0 300px;
}

.custom-input .q-field__control {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
  color: #000000;

}


.custom-input .q-field__native {
  color: #000000 !important;
  font-size: 16px;
}


.custom-input .q-placeholder {
  color: #000000 !important;
}


.custom-input .q-field__control:focus-within {
  background-color: #f5f5f5;
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

/* Hover stanje */
.custom-input .q-field__control:hover {
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
  background-color: #ffffff00;

}

.editor-wrapper {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.editor-label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

/* Content editor */
.custom-editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  min-height: 200px;
  background-color: #f5f5f5;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);

}

.custom-editor .q-editor__content {
  min-height: 150px;
}

.custom-editor:hover {
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);

}

.custom-editor:focus-within {
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
}

.custom-file-width {
  max-width: 400px;
  width: 100%;

}

.file-select-wrapper {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.custom-file-width {
  max-width: 500px;
  flex: 1;
  min-width: 200px;
}

.custom-select-width {
  max-width: 500px;
  flex: 1;
  min-width: 200px;
}

/* Fokus i hover za oba elementa */
.custom-input .q-field__control {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 14px;
  color: #000000;
}

.custom-input .q-field__control:focus-within {
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(25, 118, 210, 0.5);
}

.custom-input .q-field__control:hover {
  border-color: rgb(0, 98, 255);
  box-shadow: 0 0 5px rgba(66, 165, 245, 0.5);
  background-color: white;
}

.custom-input .q-field__label {
  color: grey !important;
}

/* FOOTER */

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: black;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;

}

.footerinfo {
  flex: 1;
  text-align: left;
  margin-left: 170px;
}

.footerinfo h3,
.footerinfo p {
  margin: 5px 0;
}

.socialmedia {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}

.socialmedia a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.socialmedia a:hover {
  text-decoration: underline;
}

.socialmedia a img {
  margin-right: 10px;
}
</style>