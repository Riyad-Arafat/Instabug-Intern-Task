<template>
  <div id="login">
    <Slider :images="images" />
    <LoginForm />
  </div>
</template>

<script>
import Slider from "@/components/Slider/index.vue";
import LoginForm from "@/components/LoginForm/index.vue";
import firstSlide from "../assets/images/1slide.svg";
import secondSlide from "../assets/images/2slide.svg";
import thirdSlide from "../assets/images/3slide.svg";

const images = [
  {
    id: 0,
    src: firstSlide,
    title: "Accelerate Your Entire Mobile Team Workflow",
  },
  {
    id: 1,
    src: secondSlide,
    title: "The Most Comprehensive Bug Reporting Tool for Mobile Apps",
  },
  {
    id: 2,
    src: thirdSlide,
    title: "Secure Crash Reporting WithReal-Time Alerts",
  },
];
export default {
  components: {
    Slider,
    LoginForm,
  },
  data() {
    return {
      images: images,
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  position: relative;
  height: 100vh;
  display: flex;
  .form {
    width: 40%;
    height: 100%;
    @media (max-width: 720px) {
      width: 100%;
    }
  }
  .slider {
    width: 60%;
    height: 99.8%;
    @media (max-width: 720px) {
      display: none;
    }
  }
}
</style>
