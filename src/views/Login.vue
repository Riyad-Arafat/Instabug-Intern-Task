<template>
  <div id="login">
    <Slider :images="images" />
    <div class="form"></div>
  </div>
</template>

<script>
import Slider from "@/components/Slider/index.vue";
import firstSlide from "../assets/images/1slide.svg";
import secondSlide from "../assets/images/2slide.svg";
import thirdSlide from "../assets/images/3slide.svg";

const images = [
  { id: 0, src: firstSlide },
  { id: 1, src: secondSlide },
  { id: 2, src: thirdSlide },
];
export default {
  components: {
    Slider,
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
    width: 50%;
    height: 100%;
    background-color: aqua;
  }
  .slider {
    width: 50%;
    height: 99.8%;
  }
}
</style>
