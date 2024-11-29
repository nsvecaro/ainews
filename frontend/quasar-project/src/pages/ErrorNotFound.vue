<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>

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
defineOptions({
  name: 'ErrorNotFound'
});
</script>

<style>

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
