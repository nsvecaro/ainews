<template>
  <q-page padding>
    
    <div class="Box">
      <h3>Create a new forum post</h3>
      <q-form @submit.prevent="onSubmit" class="q-pa-md">

        
        Title
        <q-input v-model="post.title" standout label="" class="q-mb-md custom-input" color="white" bg-color="none" />

        
        Author
        <q-input v-model="post.author" standout label="" class="q-mb-md custom-input" color="white" bg-color="none" />

        <!-- sadrzaj  -->
        <div class="editor-wrapper q-mb-md">
          Post content
          <q-editor label="Content" v-model="post.content" :toolbar="[ ['bold', 'italic', 'underline'] ]" 
                    class="custom-editor" color="white" bg-color="none" />
        </div>

        
        <div class="file-select-wrapper q-mb-md">
          
          <q-file v-model="post.image" standout label="Click to upload an image" accept="image/*"
            class="custom-input custom-file-width" color="white" bg-color="none">
            <template v-slot:prepend>
              <q-icon name="attach_file" color="black" />
            </template>
          </q-file>

          <!-- kategorija -->
          <q-select v-model="post.category" standout :options="categories" label="Select category"
            class="custom-input custom-select-width" color="white" bg-color="none" />
        </div>

        <!-- Pregled slike -->
        <div v-if="previewImage" class="q-mb-md text-center">
          <img :src="previewImage" alt="Preview" class="preview-image" />
        </div>

        <!-- spremi post -->
        <div class="q-mt-lg text-center">
          <q-btn type="submit" color="white" text-color="black" label="SAVE" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue';

const post = reactive({
  title: '',
  author: '',
  content: '',
  category: '',
  image: null, // nova varijabla za pohranu slike
});


const previewImage = ref(null);

// Dummy kategorije
const categories = [
  { label: 'General Discussion', value: 'general' },
  { label: 'Tech Talk', value: 'tech' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Off Topic', value: 'off-topic' },
];

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

// Funkcija za simulaciju slanja podataka, posto bez bekenda radim
const onSubmit = () => {
  console.log('Submitted post:', post);
  alert('Post successfully created! (simulated)');

  // resetiranje forme
  post.title = '';
  post.author = '';
  post.content = '';
  post.category = '';
  post.image = null;
  previewImage.value = null;
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

.custom-select-width {
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
