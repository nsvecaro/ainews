<template>
  <q-page padding>
    <div class="Box">
      <h3>Create a new forum post</h3>
      <q-form @submit.prevent="onSubmit" class="q-pa-md">

        
        <q-input v-model="post.title" standout label="Title" class="q-mb-md custom-input" color="white" bg-color="none" />

       

        <!-- Sadržaj objave -->
        <div class="editor-wrapper q-mb-md">
          Post content
          <q-editor label="Content" v-model="post.content" :toolbar="[ ['bold', 'italic', 'underline'], ['unordered', 'ordered'], ['undo', 'redo'], ['quote', 'code'], ['link'], ['fontSize', 'removeFormat'] ]" class="custom-editor" color="white" bg-color="none" />
        </div>

        <!-- Slika i kategorija div -->
        <div class="file-select-wrapper q-mb-md">
          <q-file v-model="post.image" standout label="Click to upload an image" accept="image/*" class="custom-input custom-file-width" color="white" bg-color="none">
            <template v-slot:prepend>
              <q-icon name="attach_file" color="black" />
            </template>
          </q-file>
        </div>

        <!-- Gumb za spremanje -->
        <div class="q-mt-lg text-center">
          <q-btn type="submit" color="white" text-color="black" label="SAVE" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

// uvjek mora biti kod sesija!!!
axios.defaults.withCredentials = true;


const route = useRoute();
const router = useRouter();
const forumId = route.params.forumId;  


const user = JSON.parse(localStorage.getItem('user')); i

const post = reactive({
  title: '',
  author: user ? user.username : '',  
  content: '',
  image: null,
});

const previewImage = ref(null);

// Funkcija za upload slike
const onImageUpload = (files) => {  
  if (files && files.length) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};


const onSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append('image', post.image);

    
    const postResponse = await axios.post('http://localhost:3000/api/forumObjava', {
      naslov: post.title,
      autor: post.author,  
      sadrzaj: post.content,
      slika: post.image,  
      ID_foruma: forumId,  
    });

    alert('Forum post created successfully!');
    console.log(postResponse.data);

   
    router.push(`/user/forum/${forumId}`);
    
    
    post.title = '';
    post.author = '';
    post.content = '';
    post.image = null;
    
  } catch (error) {
    console.error('Error:', error.message);
    alert(`Error: ${error.message}`);
  }
};
</script>

<style scoped>
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

.editor-wrapper {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
}

.custom-editor {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 5px;
  min-height: 200px;
  background-color: #f5f5f5;
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

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 10px;
}
</style>
