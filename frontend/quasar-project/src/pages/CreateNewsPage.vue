<template>
  <q-page padding>
    <!-- content -->
     <h2 class="createnew-title">Create a new article</h2>
     <div class="Box">
      <q-form @submit.prevent="onSubmit" class="q-pa-md">
        

        <!-- Naslov vijesti -->
        <q-input
          v-model="news.title"
          filled
          label="Title"
          class="q-mb-md"
          color="white"
          bg-color="none"
        />

        <!-- Autor vijesti -->
        <q-input
          v-model="news.author"
          filled
          label="Author"
          class="q-mb-md"
          color="white"
          bg-color="none"
        />

        <!-- Sadržaj vijesti -->
        <q-input
          v-model="news.content"
          filled
          type="textarea"
          label="Content"
          class="customtextarea"
          color="white"
          bg-color="none"
        />

        <!-- Upload slike -->
        <q-file
          v-model="news.image"
          filled
          label="Upload your image here"
          accept="image/*"
          class="q-mb-md"
          color="white"
          bg-color="none"
        />

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

/* Kocka za new page creation */

.Box {
  display: flex;
  background-color: rgba(241, 241, 241, 0);
  height: 100vh;
  margin: 30px 300px 30px 300px;
  flex-direction: column;
  color: black;

}

.createnew-title{
  color: black;
  text-align: center;

}

.q-mb-md {
  margin: 10px;
}

.customtextarea{
  margin: 10px;
}
.customtextarea textarea{
  resize: none;
  height: 500px;
  overflow-y: auto;

}



.footer{
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
.footerinfo{
  flex: 1;
  text-align: left;
  margin-left: 170px;
}

.footerinfo h3, .footerinfo p{
  margin: 5px 0;
}

.socialmedia{
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: left;
  margin-right: 170px;
}
.socialmedia a{
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}
.socialmedia a:hover {
  text-decoration: underline;
}
.socialmedia a img{
  margin-right: 10px;
} 

</style>