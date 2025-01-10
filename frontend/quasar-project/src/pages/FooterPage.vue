<template>
  <div class="footer">
    <div class="footerinfo">
      <h3>AI NEWS</h3>
      <p>All rights reserved by AINews &#169;</p>
    </div>
    <div class="socialmedia">
      <p>Social Media</p>
      <a href="https://www.instagram.com"><img src="/src/assets/igIcon.png" alt="Instagram" width="15px">Instagram</a>
      <a href="https://www.facebook.com"><img src="/src/assets/fbIcon.png" alt="Facebook" width="15px">Facebook</a>
      <a href="https://www.x.com"><img src="/src/assets/xIcon.png" alt="X" width="15px">X</a>
    </div>
  </div>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 275px;
  background-color: black;
  color: white;
  padding: 20px;
  box-sizing: border-box;
  margin-top: auto; /* Gura footer na dno */
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
.socialmedia p{
  margin-bottom: 5px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.334);
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