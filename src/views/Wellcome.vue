<template>
  <div class="wellcome">
    <h2>
      Welcome <span>{{ userEmail }} </span> to our website
    </h2>
    <div class="logout">
      <Button
        title="LogOut"
        id="logout-btn"
        titleColor="#fff"
        @click="logOut"
      />
    </div>
  </div>
</template>

<script>
import Button from "../components/Button/index";
export default {
  components: {
    Button,
  },
  data() {
    return {
      userEmail: "",
    };
  },
  created() {
    this.userEmail = localStorage.getItem("email");
  },
  methods: {
    logOut: function () {
      localStorage.removeItem("email");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.wellcome {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  h2 {
    span {
      color: #00287a;
    }
  }
}
</style>
