<template>
  <div class="not-found">
    <img src="../assets/images/404.png" alt="" srcset="" />
    <h1>404 - Page Not Found!</h1>
    <h3>Sorry, that page doesn't exist. What would you like to do?</h3>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 800px;
    max-width: 100%;
  }
  h1 {
    color: #00287a;
  }
  h3 {
    color: #bdbdbd;
  }
}
</style>
